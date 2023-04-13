import { dateOnly } from 'src/utility/dateUtil'

const {
  Box,
  Image,
  Badge,
  VStack,
  Text,
  AspectRatio,
  HStack,
} = require('@chakra-ui/react')

const ActiveDrive = ({ data }) => {
  let maleNeeded = parseInt(data.juben?.players.split('|')[0]) - data.male
  let femaleNeeded = parseInt(data.juben?.players.split('|')[1]) - data.female
  return (
    <Box
      maxW="xl"
      minW="3xs"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={data.juben.image} alt={data.juben.name} />

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
              {data.juben.name}
            </Text>
            <Box>
              ${data.juben.price}
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
          <HStack maxW="120" overflow="hidden" textOverflow="ellipsis" w="full">
            {data.users?.map((u) => (
              <AspectRatio ratio={1 / 1} maxW="30px" key={u.id} w="full">
                <Image src={u.thumbnail} objectFit="cover" rounded="full" />
              </AspectRatio>
            ))}
          </HStack>

          <Text fontSize="xs">
            {maleNeeded <= 0 && femaleNeeded <= 0 && '已满'}
            {(maleNeeded > 0 || femaleNeeded > 0) && '等'}
            {maleNeeded > 0 && `${maleNeeded}男`}
            {femaleNeeded > 0 && `${femaleNeeded}女`}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default ActiveDrive
