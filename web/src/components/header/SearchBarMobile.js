import { useState } from 'react'

import { Button, Input, HStack, Box } from '@chakra-ui/react'
import { BiSearchAlt2 } from 'react-icons/bi'

import SearchWindow from '../UI/SearchWindow/SearchWindow'

const SearchBarMobile = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <Box display={{ base: 'flex', lg: 'none' }}>
      <Box
        onClick={openModal}
        display={props.isHome ? 'none' : 'block'}
        borderRadius="full"
        border="1px"
        _hover={{ bg: 'gray.700' }}
        pl="8"
        alignItems="center"
        alignSelf="center"
      >
        <HStack justifyContent="space-between">
          <Input
            variant="unstyled"
            readOnly
            defaultValue="剧本"
            value={props.query?.name}
            cursor="pointer"
          />
          <Input
            variant="unstyled"
            readOnly
            defaultValue="时间"
            value={props.query?.date}
            cursor="pointer"
          />
          <Input
            variant="unstyled"
            readOnly
            defaultValue="人数"
            value={props.query?.people}
            maxW="20"
            cursor="pointer"
          />
          <Button variant="unstyle" w="32" py={7}>
            <BiSearchAlt2 size="24" />
          </Button>
        </HStack>
      </Box>
      <SearchWindow isOpen={isOpen} closeModal={closeModal} />
    </Box>
  )
}

export default SearchBarMobile
