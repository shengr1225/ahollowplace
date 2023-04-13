import { HStack } from '@chakra-ui/react'

import { useAuth } from 'src/auth'

import LoginLink from './LoginLink'
import Logo from './Logo'
import NavLinks from './NavLinks'
import SeachBarDesktop from './SearchBarDesktop'
import SearchBarMobile from './SearchBarMobile'
import UserProfileLink from './UserProfileLink'

const NavBar = (props) => {
  const { isAuthenticated, currentUser } = useAuth()

  return (
    <>
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems={['center', 'center', 'revert']}
        spacing={[0, 2, 8, 8]}
      >
        <Logo isHome={props.isHome} />
        <SeachBarDesktop isHome={props.isHome} />
        <SearchBarMobile isHome={props.isHome} />

        <NavLinks isHome={props.isHome} />

        <HStack alignItems="revert">
          {isAuthenticated && currentUser ? <UserProfileLink /> : <LoginLink />}
        </HStack>
      </HStack>
    </>
  )
}

export default NavBar
