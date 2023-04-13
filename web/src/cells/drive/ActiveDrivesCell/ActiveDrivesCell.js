import { Box, Heading, HStack, Text } from '@chakra-ui/react'
import { MagnifyingGlass } from 'react-loader-spinner'
import Lottie from 'react-lottie'

import ActiveDrive from 'src/components/drive/ActiveDrive'
import eyesAnimation from 'src/lottie/eyes_animation.json'
import { getRefToScrollByIndex } from 'src/reducer/GlobalData'

export const QUERY = gql`
  query ActiveDrivesQuery {
    activeDrives {
      id
      date
      male
      female
      total
      status
      juben {
        id
        name
        sections
        price
        image
        canSwitchSex
        players
      }
      timeSlot {
        id
        start
        end
      }
      users {
        id
        thumbnail
        name
      }
      bookings {
        id
        male
        female
      }
    }
  }
`

export const Loading = () => (
  <div>
    <MagnifyingGlass
      width="200"
      ariaLabel="loading"
      wrapperClass="mx-auto mt-5"
    />
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ activeDrives }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: eyesAnimation,
    rendererSettings: {
      // preserveAspectRatio: "xMidYMid slice"
    },
  }
  return (
    <Box
      h="calc(100vh)"
      style={{ scrollSnapAlign: 'start' }}
      pt={['4', '8', '16']}
      position="relative"
    >
      <Heading fontSize="4xl" textAlign="center">
        拼车信息
      </Heading>
      <Text textAlign="center" color="gray.600" mt="4">
        当前拼车信息, 一键上车
      </Text>
      <HStack pt="8" spacing="8" overflowX="scroll" px="20">
        {activeDrives.map((item) => {
          return <ActiveDrive key={item.id} data={item} />
        })}
      </HStack>
      <Box
        position="absolute"
        bottom="0"
        left="50%"
        transform="translate(-50%,0)"
        onClick={() => {
          const ref = getRefToScrollByIndex(1)
          ref?.current.scrollIntoView()
        }}
        w="80px"
      >
        <Lottie options={defaultOptions} height={80} width={80} />
      </Box>
    </Box>
  )
}
