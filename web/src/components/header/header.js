import { Flex } from '@chakra-ui/react'

import Navbar from './NavBar'

const StyleHeader = (props) => {
  return (
    <Flex pt="10">
      <Navbar {...props} />
    </Flex>
  )
}

export default StyleHeader
