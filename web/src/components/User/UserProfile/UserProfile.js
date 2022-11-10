import { useState } from 'react'

import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import { client } from 'filestack-react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaRegAddressBook } from 'react-icons/fa'
import { GiEntangledTyphoon } from 'react-icons/gi'
import ReactTooltip from 'react-tooltip'

import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import InvitePlayersWindow from 'src/components/UI/InvitePlayersWindow/InvitePlayersWindow'
import RadarChart from 'src/components/UI/RadarChart'
import UserAbilityUpdateWindow from 'src/components/UI/UserAbilityUpdateWindow/UserAbilityUpdateWindow'
import UserProfileUpdateWindow from 'src/components/UI/UserProfileUpdateWindow.js/UserProfileUpdateWindow'
import { dateOnly } from 'src/utility/dateUtil'
import { thumbnailSize, listSize } from 'src/utility/helper'

const levelMap = [-1, 2, 5, 9, 14, 20, 27, 35, 44, 54, 65, 77, 90, 104, 119]
const roleNameMap = {
  tuili: [
    '入门者',
    '入门者',
    '入门者',
    '日暮警官',
    '日暮警官',
    '毛利小五郎',
    '毛利小五郎',
    '世良真纯',
    '世良真纯',
    '琴酒',
    '怪盗基德',
    '白马探',
    '服部平次',
    '柯南',
    '工藤优作',
    '服部平藏',
  ],
  yanji: [
    '入门者',
    '入门者',
    '入门者',
    '书生学徒',
    '书生',
    '游荡的说书人',
    '说书人',
    '酒馆说书人',
    '洞屋说书人',
    '戏精',
    '成年戏精',
    '老戏精',
    '戏骨',
    '老戏骨',
    '张国锋',
    '吉世光',
  ],
  xiezuo: [
    '入门者',
    '入门者',
    '入门者',
    '副排长',
    '排长',
    '副连长',
    '连长',
    '副营长',
    '营长',
    '副团长',
    '团长',
    '副旅长',
    '旅长',
    '师长',
    '军长',
    '司令',
  ],
  gaoxiao: [
    '入门者',
    '入门者',
    '入门者',
    '新人谐星',
    '谐星',
    '相声演员',
    '小品演员',
    '小丑',
    '有趣的小丑',
    '小丑女',
    '黑化的小丑女',
    'Joker',
    '泰迪',
    '憨豆先生',
    '卓别林',
  ],
  qinggan: [
    '入门者',
    '入门者',
    '入门者',
    '裂开的菠萝头',
    '情窦初开',
    '花季雨季',
    '匆匆那年',
    '毕业分手季',
    '生锈的水龙头',
    '水龙头',
    '水库水龙头',
    '遥控水龙头',
    '情感导师',
    '情感大师',
    '时间管理大师',
  ],
}

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      thumbnail
      desc
      label
      tuili
      yanji
      xiezuo
      gaoxiao
      qinggan
      knot
    }
  }
`

const LinearProgressWithLabel = (props) => (
  <Box className="mt-2">
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" {...props} />
    </Box>
    <Box sx={{ minWidth: 35 }}>
      <Typography variant="body2" color="text.secondary">
        {props.label}
      </Typography>
    </Box>
  </Box>
)

const roleName = (user) => {
  var roleNames = ''
  const abilities = {
    tuili: user.tuili,
    yanji: user.yanji,
    xiezuo: user.xiezuo,
    gaoxiao: user.gaoxiao,
    qinggan: user.qinggan,
  }
  var abilityObj = {}
  Object.keys(abilities).forEach((k) => {
    if (abilityObj.hasOwnProperty(abilities[k])) {
      abilityObj[abilities[k]] += ',' + k
    } else {
      abilityObj[abilities[k]] = k
    }
  })

  if (Object.keys(abilityObj).length) {
    const maxAbility = Math.max.apply(null, Object.values(abilities))
    const abilityNames = abilityObj[maxAbility.toString()]
    if (abilityNames) {
      const names = abilityNames.split(',')
      names.forEach((name) => {
        if (roleNames && roleNames != roleNameMap[name][maxAbility]) {
          roleNames += '|' + roleNameMap[name][maxAbility]
        } else {
          roleNames = roleNameMap[name][maxAbility]
        }
      })
    }
  }
  return roleNames
}

const UserExpInfo = (props) => {
  const currentExp = props.user?.currentExp
  const futureLvs = levelMap.filter((exp) => {
    return currentExp >= exp
  })

  const currentLv = levelMap.indexOf(futureLvs[futureLvs.length - 1]) + 1
  const nextExp = levelMap[currentLv]
  return (
    <div>
      <div>
        Lv.{currentLv} {roleName(props.user)}
      </div>
      <div>
        <LinearProgressWithLabel
          value={(currentExp / nextExp) * 100}
          label={currentExp + '/' + nextExp}
        />
      </div>
    </div>
  )
}

const UserProfile = (props) => {
  const { isAuthenticated, currentUser } = useAuth()
  const [isInviteWindowOpen, setIsInviteWindowOpen] = useState(false)
  const [isUserProfileUpdateWindowOpen, setIsUserProfileUpdateWindowOpen] =
    useState(false)
  const [isAbilibtyWindowOpen, setIsAbilityWindowOpen] = useState(false)
  const [selectBooking, setSelectBooking] = useState(null)
  const [thumbnail, setThumbnail] = useState(props.user?.thumbnail)
  const closeWindow = () => {
    setIsInviteWindowOpen(false)
    setIsUserProfileUpdateWindowOpen(false)
    setIsAbilityWindowOpen(false)
    props.refetch()
  }

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User updated!')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const fileStackClient = client.init(process.env.REDWOOD_ENV_FILESTACK_API_KEY)

  const onFileUpload = (response) => {
    setThumbnail(response.filesUploaded[0].url)
    updateUser({
      variables: {
        id: props.user?.id,
        input: {
          thumbnail: response.filesUploaded[0].url,
        },
      },
    })
  }

  const onOpenThumbnail = () => {
    fileStackClient
      .picker({
        onUploadDone: onFileUpload,
        transformations: {
          crop: true,
          rotate: true,
        },
        fromSources: ['local_file_system', 'instagram', 'facebook'],
        displayMode: 'overlay',
      })
      .open()
  }

  const onClickInvite = (b) => {
    setIsInviteWindowOpen(!isInviteWindowOpen)
    setSelectBooking(b)
  }
  const pointsData = (user) => {
    var multiplier = 2
    if (
      (user?.tuili ||
        user?.yanji ||
        user?.xiezuo ||
        user?.gaoxiao ||
        user?.qinggan) > 5
    ) {
      multiplier = 1
    } else if (
      (user?.tuili ||
        user?.yanji ||
        user?.xiezuo ||
        user?.gaoxiao ||
        user?.qinggan) > 10
    ) {
      multiplier = 0.5
    }
    return [
      {
        推理: (user?.tuili * multiplier) / 10,
        演技: (user?.yanji * multiplier) / 10,
        协作: (user?.xiezuo * multiplier) / 10,
        搞笑: (user?.gaoxiao * multiplier) / 10,
        情感: (user?.qinggan * multiplier) / 10,
      },
    ]
  }

  const averagePoint = (
    (props.user?.tuili +
      props.user?.yanji +
      props.user?.xiezuo +
      props.user?.gaoxiao +
      props.user?.qinggan) /
    5
  ).toFixed(2)

  const PeopleInfo = ({ male, female, needed }) => {
    const peopleJoined = male + female
    const maleNeeded = parseInt(needed?.split('|')[0]) - male
    const femaleNeeded = parseInt(needed?.split('|')[1]) - female
    const totalNeeded = parseInt(maleNeeded) + parseInt(femaleNeeded)
    console.log(male, female, needed)
    var info = ''
    if (totalNeeded) {
      info = (
        <span>
          {peopleJoined}等{totalNeeded}
        </span>
      )
    } else {
      info = <span className="text-red-500">{peopleJoined}人(已满)</span>
    }

    return info
  }

  const Image = (props) => (
    <div
      className="rounded h-48 md:h-120 bg-cover bg-center relative flex whitespace-nowrap mx-1 min-w-[8rem]"
      style={{
        backgroundImage: 'url(' + listSize(props.image) + ')',
      }}
    >
      <div
        className="absolute flex top-0 px-2 text-sm text-white text-ellipsis overflow-hidden bg-gray-900"
        style={{
          textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
        }}
      >
        {props.juben?.name}
      </div>
      <p
        className="absolute bottom-0 text-sm px-2 text-gray-300 text-ellipsis overflow-hidden bg-gray-900 w-full"
        style={{
          textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
        }}
      >
        {props.juben?.sections}
      </p>
    </div>
  )

  const BookingJuben = (props) => {
    return (
      <div
        key={props.booking?.id}
        className="flex-1 flex-col py-3 min-w-[10rem]"
      >
        <Image
          image={props.booking?.juben?.image}
          juben={props.booking?.juben}
        />
        <div className="flex justify-between p-2 text-sm text-gray-900">
          <div className="flex-col">
            <div>
              {dateOnly(props.booking?.date) +
                ' | ' +
                props.booking?.timeSlot?.start +
                '-' +
                props.booking?.timeSlot?.end}
            </div>
            <div className="flex align-middle leading-5 pt-1">
              <BsFillPeopleFill className="text-lg mr-1" />
              <PeopleInfo
                male={props.totalBooking?.male}
                female={props.totalBooking?.female}
                needed={props.booking?.juben?.players}
              />
            </div>
          </div>
          <button
            className="bg-primary-200 p-4 text-white rounded-lg hover:bg-primary-100 self-center leading-[0.5rem] max-h-[3rem]"
            onClick={onClickInvite.bind(this, {
              booking: props.booking,
              totalBooking: props.totalBooking,
              slot:
                parseInt(props.booking?.juben?.players?.split('|')[0]) +
                parseInt(props.booking?.juben?.players?.split('|')[1]),
            })}
          >
            <span className="text-lg">+</span>
          </button>
        </div>
      </div>
    )
  }

  const thumbnailBg = {
    backgroundImage: 'url(' + thumbnailSize(thumbnail) + ')',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className="text-gray-800 py-8 px-4 md:flex md:flex-row columns-1">
      <ReactTooltip />
      <Toaster />
      <div className="rounded-xl border-gray-400 border max-w-xs px-4 lg:ml-auto lg:mr-0 ml-auto mr-auto text-center w-full md:w-2/5">
        <div className="p-8 border-b border-gray-400">
          <div
            className="bg-center w-32 h-32 rounded-full mx-auto"
            style={thumbnailBg}
          ></div>
          <UserExpInfo user={props.user} />

          {isAuthenticated && currentUser.id == props.user?.id ? (
            <button
              onClick={onOpenThumbnail}
              className="underline text-sm mt-4  cursor-pointer"
            >
              更新头像
            </button>
          ) : (
            <></>
          )}

          {/* <div className="flex leading-5 pt-6 align-middle hover:underline cursor-pointer font-semibold">
            <AiOutlineStar className="text-xl" />
            <span className="ml-2">6 次评论</span>
          </div> */}
          <div className="flex leading-5 pt-4 align-middle hover:underline cursor-pointer font-semibold">
            <FaRegAddressBook className="text-xl" />
            <span className="ml-2">
              {
                props.user?.bookings?.filter((b) => {
                  return b.status == 'complete'
                }).length
              }{' '}
              次打本{' '}
              <span className="text-sm">
                (MVP {props.user?.mvpJubens?.length}次)
              </span>
            </span>
          </div>
        </div>

        <div className="p-8 md:p-4 border-b border-gray-400">
          <div className="flex pb-8 justify-around">
            <div className="flex leading-5 ">
              <span>综合战力: {averagePoint}</span>
              <AiOutlineQuestionCircle
                className="text-xl ml-2 cursor-pointer"
                data-tip="综合战力是通过五项指数的平均分计算出来的（一至五分）"
              />
            </div>

            {isAuthenticated && currentUser.id == props.user?.id ? (
              <button
                onClick={() => {
                  setIsAbilityWindowOpen(true)
                }}
                className="underline text-sm text-gray-500 ml-8 cursor-pointer"
              >
                调整
              </button>
            ) : (
              <></>
            )}
          </div>
          <RadarChart data={pointsData(props.user)} size={250} />
        </div>
      </div>

      <div className="px-8 pt-5 md:pt-0 w-full md:w-3/5">
        <div>
          <h1 className="text-4xl font-bold pb-2">
            你好，我叫{props.user?.name}
            {isAuthenticated && currentUser.id == props.user?.id ? (
              <button
                onClick={() => {
                  setIsUserProfileUpdateWindowOpen(true)
                }}
                className="underline text-sm text-gray-500 ml-8 cursor-pointer"
              >
                更新
              </button>
            ) : (
              <></>
            )}
          </h1>
          {props.user?.label?.split(',').map((label) => (
            <p
              className="text-sm font-light text-gray-600"
              key={props.user?.id + label}
            >
              {label}
            </p>
          ))}
          <h1 className="text-2xl pt-8 pb-4">简介</h1>
          <p className="text-sm font-light text-gray-600">{props.user?.desc}</p>
          <div className="flex leading-5 py-8 align-middle font-semibold border-b border-gray-400">
            <GiEntangledTyphoon className="text-xl" />
            <span className="ml-2 text-sm">
              羁绊：<span>{props.user?.knot}</span>
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl pt-8 pb-4">{props.user?.name} 玩过的剧本</h1>
          <div className="flex justify-start overflow-x-auto">
            {props.user?.bookings
              ?.filter((b) => {
                return b.status === 'Complete'
              })
              ?.map((booking) => (
                <Image
                  image={booking?.juben?.image}
                  juben={booking?.juben}
                  key={booking?.id}
                />
              ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl pt-8 pb-4">{props.user?.name} 的预约</h1>
          <div className="flex overflow-x-auto">
            {props.user?.bookings
              ?.filter((b) => {
                return b.status === 'Carpooling' || b.status == 'Locked'
              })
              .map((booking) => (
                <BookingJuben
                  booking={booking}
                  totalBooking={
                    booking?.juben?.drives.filter((b) => {
                      return (
                        new Date(b.date).getTime() ==
                          new Date(booking?.date).getTime() &&
                        b.timeSlotId == booking?.timeSlotId
                      )
                    })[0]
                  }
                  key={booking.id}
                />
              ))}
          </div>
          <UserProfileUpdateWindow
            user={props.user}
            isOpen={isUserProfileUpdateWindowOpen}
            onClose={closeWindow}
          />
          <InvitePlayersWindow
            selectBooking={selectBooking}
            isOpen={isInviteWindowOpen}
            onClose={closeWindow}
          />
          <UserAbilityUpdateWindow
            user={props.user}
            isOpen={isAbilibtyWindowOpen}
            onClose={closeWindow}
          />
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default UserProfile
