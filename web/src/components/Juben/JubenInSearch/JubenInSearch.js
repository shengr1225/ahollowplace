import { useState } from 'react'

import { confirmAlert } from 'react-confirm-alert'

import { useAuth } from '@redwoodjs/auth'
import { useLocation } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import BookingButton from 'src/components/UI/BookingButton/BookingButton'
import StarRating from 'src/components/UI/StarRating'
import { dateOnly, timeSlotConflit, getLocalTime } from 'src/utility/dateUtil'
import { highlightSize } from 'src/utility/helper'

import 'react-confirm-alert/src/react-confirm-alert.css'

const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBookingMutation($input: CreateBookingInput!) {
    createBooking(input: $input) {
      id
    }
  }
`

const getUrlParam = () => {
  const searchParam = useLocation().search
  const query = new URLSearchParams(searchParam)
  const date = new Date(query.get('date'))
  return {
    name: query.get('name'),
    date: date,
    people: query.get('people'),
  }
}

const playersOfJuben = (people) => {
  const players = people?.split('|')
  return `${players[0]}男${players[1]}女`
}

const JubenInSearch = ({ juben }) => {
  const { isAuthenticated, currentUser } = useAuth()

  const [createBooking] = useMutation(CREATE_BOOKING_MUTATION, {
    onCompleted: () => {
      toast.success('Booking created')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [selectedBooking, setSelectedBooking] = useState(null)
  const onChangeSelectedBooking = (data) => {
    setSelectedBooking(data)
  }

  const [selectedPeople, setSelectedPeople] = useState(getUrlParam().people)
  const onBook = () => {
    if (!isAuthenticated) {
      return toast.error('需要先登录才能预订剧本～')
    }
    if (!selectedBooking) {
      return toast.error('需要在左边选择一个时间～')
    }

    const male = parseInt(selectedPeople?.split('|')[0])
    const female = parseInt(selectedPeople?.split('|')[1])
    const total = male + female

    confirmAlert({
      title: `您将预订 ${
        dateOnly(selectedBooking.date) +
        ' | ' +
        selectedBooking.start +
        '-' +
        selectedBooking.end
      }的 ${juben.name}，人数：${male}男${female}女`,
      message: '确定预订吗？（预订后在人满前均可取消或修改）',
      buttons: [
        {
          label: '是的' + '（我已明白人满后将不可取消）',
          onClick: () => {
            const bookingInput = {
              timeSlotId: selectedBooking.timeSlotId,
              date: getLocalTime(selectedBooking.date),
              jubenId: juben.id,
              total: total,
              male: male,
              female: female,
              note: '',
              users: [{ id: currentUser.id }],
            }
            createBooking({ variables: { input: bookingInput } })
          },
        },
        {
          label: '我再想想',
        },
      ],
    })
  }
  const Image = () => (
    <div
      className="hidden rounded md:block md:w-1/2 flex-shrink-0 h-60 md:h-120 bg-cover bg-center mx-4 sm:mx-8 md:mx-4"
      style={{ backgroundImage: 'url(' + highlightSize(juben.image) + ')' }}
    ></div>
  )
  return (
    <div className="overflow-hidden width-full transition-all ease-in-out duration-300 cursor-pointer py-8 border-b-2 px-4">
      <div className="flex justify-between min-h-4">
        <Image />
        <div className="flex flex-col">
          <p className="text-gray-600 text-sm">{juben.sections}</p>
          <p className="text-2xl">{juben.name}</p>
          <p className="font-light text-sm my-4 h-32 overflow-hidden text-ellipsis">
            {juben.desc?.replace(/\\n/g, '')}
          </p>
          <div className="flex justify-start">
            <div className="mr-3 flex">
              <span className="mr-1">{juben.score}</span>
              <StarRating editing={false} totalStars={5} value={juben.score} />
            </div>
            <div className="mr-4">{playersOfJuben(juben.players)}</div>
            <div>${juben.price.toFixed(2)} / 人</div>
          </div>
        </div>
      </div>
      <div className="flex px-4 overflow-x-scroll">
        {juben?.drives?.filter((d)=>{
          return d.status === "Locked"
        }).map((drive) => {
          return (
            <BookingButton
              key={drive.id}
              date={drive.date}
              timeSlotId={drive.timeSlot?.id}
              start={drive.timeSlot?.start}
              end={drive.timeSlot?.end}
              male={drive.male}
              female={drive.female}
              players={juben.players}
              onClick={onChangeSelectedBooking}
            />
          )
        })}
        {juben.timeSlots?.map((timeSlot) => {
          const inBooking = (timeSlot, date) => {
            return (
              juben?.drives?.filter((drive) => {
                return (
                  drive.status === "Locked" && new Date(drive.date).getTime() ==
                    new Date(date).getTime() &&
                  timeSlotConflit(drive.timeSlot, timeSlot)
                )
              }).length > 0
            )
          }
          if (inBooking(timeSlot, getUrlParam().date)) {
            return <></>
          }
          return (
            <BookingButton
              key={timeSlot.id}
              date={dateOnly(getUrlParam().date)}
              timeSlotId={timeSlot.id}
              start={timeSlot.start}
              end={timeSlot.end}
              male={0}
              female={0}
              players={juben.players}
              onClick={onChangeSelectedBooking}
            />
          )
        })}
        <button
          className="flex-grow px-3 bg-primary-100 hover:bg-primary-300 transition duration-300 rounded-md mt-5 text-sm text-white cursor-pointer"
          onClick={onBook}
        >
          预订({selectedPeople?.split('|')[0]}男{selectedPeople?.split('|')[1]}
          女)
        </button>
      </div>
      <div></div>
    </div>
  )
}

export default JubenInSearch
