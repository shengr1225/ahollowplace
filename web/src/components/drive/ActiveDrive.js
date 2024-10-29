import { useState } from 'react'

import { useAuth } from 'src/auth'
import InvitePlayersWindow from 'src/components/UI/InvitePlayersWindow/InvitePlayersWindow'
import { dateOnly } from 'src/utility/dateUtil'

const {
  Box,
  Image,
  Badge,
  VStack,
  Text,
  AspectRatio,
  HStack,
  Button,
} = require('@chakra-ui/react')

const ActiveDrive = ({ data, refetch }) => {
  const { isAuthenticated, currentUser } = useAuth()

  let booking = {
    male: 0,
    female: 0,
    total: 0,
    juben: data.juben,
    timeSlotId: data.timeSlot?.id,
    users: [{ id: currentUser?.id }],
    date: data.date,
  }

  data.bookings?.forEach((b) => {
    b.users?.forEach((u) => {
      if (isAuthenticated && currentUser.id == u.id) {
        booking.id = b.id
        booking.male = b.male
        booking.female = b.female
        booking.total = b.total
        booking.users = b.users
        return
      }
    })
  })

  const hasMyBooking =
    isAuthenticated &&
    data.bookings?.some((b) => b.users?.some((u) => u.id == currentUser?.id))

  const totalBooking = {
    total: data.total,
    male: data.male,
    female: data.female,
  }
  const slot =
    parseInt(data.juben?.players?.split('|')[0]) +
    parseInt(data.juben?.players?.split('|')[1])

  const [isInviteWindowOpen, setIsInviteWindowOpen] = useState(false)

  let maleNeeded = parseInt(data.juben?.players.split('|')[0]) - data.male
  let femaleNeeded = parseInt(data.juben?.players.split('|')[1]) - data.female
  if (maleNeeded + femaleNeeded == 0) {
    maleNeeded = 0
    femaleNeeded = 0
  }
  return (
    <Box maxW="2xs" minW="3xs" borderWidth="1px" borderRadius="lg">
      <VStack>
        <AspectRatio ratio={1} w="full" h="250px">
          <Image src={data.juben?.image} alt={data.juben?.name} />
        </AspectRatio>

        <Box p="4">
          <VStack alignItems="flex-start">
            <Box spacing="1">
              {data.juben?.sections?.split(' ').map((section) => (
                <Badge
                  key={section}
                  borderRadius="full"
                  mr="1"
                  colorScheme="teal"
                >
                  {section}
                </Badge>
              ))}
              <Badge colorScheme="orange">
                {data.juben?.canSwitchSex && <span>可反串</span>}
              </Badge>
            </Box>

            <Text
              color="gray.500"
              fontWeight="semibold"
              fontSize="xs"
              ml="2"
              pt="-2"
            >
              {dateOnly(data.date) +
                ' | ' +
                data.timeSlot?.start +
                '-' +
                data.timeSlot?.end}
            </Text>
          </VStack>

          <Box mt="1" fontWeight="semibold" as="h4">
            <HStack justifyContent="space-between">
              <Text maxW="120" textOverflow="ellipsis" noOfLines={1}>
                {data.juben?.name}
              </Text>
              <Box>
                ${data.juben?.price}
                <Box as="span" color="gray.600" fontSize="sm">
                  / 人
                </Box>
              </Box>
            </HStack>
          </Box>

          <Box
            display="flex"
            mt="2"
            alignItems="center"
            justifyContent="space-between"
            overflow="clip"
          >
            <HStack
              maxW="100"
              overflow="hidden"
              textOverflow="ellipsis"
              w="full"
            >
              {data.users?.map((u) => (
                <AspectRatio ratio={1 / 1} maxW="30px" key={u.id} w="full">
                  <Image src={u.thumbnail} objectFit="cover" rounded="full" />
                </AspectRatio>
              ))}
            </HStack>

            <Text fontSize="xs" flexGrow={1} textAlign="right">
              {maleNeeded <= 0 && femaleNeeded <= 0 && '已满'}
              {(maleNeeded > 0 || femaleNeeded > 0) && '等'}
              {maleNeeded > 0 && `${maleNeeded}男`}
              {femaleNeeded > 0 && `${femaleNeeded}女`}
            </Text>
          </Box>

          <Box textAlign="center" pt="4">
            <Button
              variant="solid"
              bg="red.400"
              color="white"
              fontWeight="extrabold"
              onClick={() => {
                setIsInviteWindowOpen(true)
              }}
              disabled={!maleNeeded && !femaleNeeded && !hasMyBooking}
            >
              我要上车
            </Button>
          </Box>
        </Box>
      </VStack>
      <InvitePlayersWindow
        selectBooking={{ booking, totalBooking, slot }}
        isOpen={isInviteWindowOpen}
        onClose={() => {
          setIsInviteWindowOpen(false)
          refetch()
        }}
      />
    </Box>
  )
}

export default ActiveDrive
