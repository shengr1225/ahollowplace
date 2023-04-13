import React, { useState } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  VStack,
  Text,
  HStack,
  Divider,
  Heading,
  Box,
} from '@chakra-ui/react'
import { BiMale, BiFemale } from 'react-icons/bi'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

const UPDATE_BOOKING_MUTATION = gql`
  mutation UpdateBookingMutation($id: Int!, $input: UpdateBookingInput!) {
    updateBooking(id: $id, input: $input) {
      id
      date
      male
      female
      total
      note
      jubenId
      timeSlotId
    }
  }
`

const InvitePlayersWindow = (props) => {
  const [updateBooking] = useMutation(UPDATE_BOOKING_MUTATION, {
    onCompleted: () => {
      toast.success('Booking updated')
      props.onClose()
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message)
    },
  })

  const [maleCount, setMaleCount] = useState(-1)
  const [femaleCount, setFemaleCount] = useState(-1)
  const booking = props.selectBooking?.booking
  const totalBooking = props.selectBooking?.totalBooking

  const onUpdateBooking = () => {
    const _maleCount = maleCount == -1 ? booking.male : maleCount
    const _femaleCount = femaleCount == -1 ? booking.male : femaleCount
    console.log(_maleCount, _femaleCount)
    if (_maleCount == booking.male && _femaleCount == booking.female) {
      props.onClose()
      return
    }
    if (
      _maleCount + _femaleCount >=
      props.slot - totalBooking.total + booking.total
    ) {
      return toast.error('超出剧本人数限制，请调整人数。')
    }
    updateBooking({
      variables: {
        id: booking.id,
        input: {
          date: booking.date,
          total: _maleCount + _femaleCount,
          male: _maleCount,
          female: _femaleCount,
          note: booking.note,
          jubenId: booking.juben.id,
          timeSlotId: booking.timeSlotId,
          users: booking.users.map((x) => {
            return { id: x.id }
          }),
        },
      },
    })
  }
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="玩家列表"
      width="80"
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>邀请好友 / 调整人数</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack p="4" spacing="2">
            <HStack justifyContent="space-between" w="full">
              <span>{totalBooking?.total}人</span>
              <span className="flex">
                {Array.from({ length: totalBooking?.male }, (_, i) => (
                  <BiMale
                    key={'male' + i}
                    className={`text-xl ${
                      booking.male >= i + 1 ? 'text-red-700' : ''
                    }`}
                  />
                ))}
                {Array.from({ length: totalBooking?.female }, (_, i) => (
                  <BiFemale
                    key={'female' + i}
                    className={`text-xl ${
                      booking.female >= i + 1 ? 'text-red-700' : ''
                    }`}
                  />
                ))}
              </span>
            </HStack>
            {Array.from(
              {
                length:
                  parseInt(booking?.juben?.players.split('|')[0]) +
                  parseInt(booking?.juben?.players.split('|')[1]) -
                  totalBooking?.total,
              },
              (i) => (
                <HStack justifyContent="space-between" w="full" key={i}>
                  <span>1人</span>
                  <span className="cursor-pointer hover:opacity-75">
                    邀请 +
                  </span>
                </HStack>
              )
            )}
          </VStack>

          <Divider />

          <Heading fontSize="lg" pt="6" pb="4">
            调整我的参加人数 (
            {booking?.juben?.canSwitchSex ? '可反串' : '不可反串'})
          </Heading>

          <Box w="full">
            <VStack w="full">
              <Box p="4" spacing="2" w="full">
                <HStack justifyContent="space-between">
                  <Text htmlFor="meBookingPeopleMale" minW="16">
                    男: {maleCount == -1 ? booking?.male : maleCount}人
                  </Text>
                  <input
                    id="meBookingPeopleMale"
                    type="range"
                    min={0}
                    max={
                      parseInt(booking?.juben?.players.split('|')[0]) +
                      parseInt(booking?.juben?.players.split('|')[1]) -
                      (totalBooking?.total - booking?.total)
                    }
                    value={maleCount == -1 ? booking?.male : maleCount}
                    onChange={(e) => {
                      setMaleCount(parseInt(e.target.value))
                    }}
                    className="w-full"
                  />
                </HStack>
                <HStack justifyContent="space-between">
                  <Text htmlFor="meBookingPeopleFemale" minW="16">
                    女: {femaleCount == -1 ? booking?.female : femaleCount}人
                  </Text>
                  <input
                    id="meBookingPeopleFemale"
                    type="range"
                    min={0}
                    max={
                      parseInt(booking?.juben?.players.split('|')[0]) +
                      parseInt(booking?.juben?.players.split('|')[1]) -
                      (totalBooking?.total - booking?.total)
                    }
                    value={femaleCount == -1 ? booking?.female : femaleCount}
                    onChange={(e) => {
                      setFemaleCount(parseInt(e.target.value))
                    }}
                    className="w-full"
                  />
                </HStack>
              </Box>
            </VStack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={onUpdateBooking}
            className="hover:bg-red-500 w-full py-2 text-sm cursor-pointer font-semibold border-t text-white bg-red-600 rounded-lg ml-auto text-center mt-auto"
          >
            确认
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default InvitePlayersWindow
