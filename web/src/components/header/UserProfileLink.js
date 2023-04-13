import { MoonIcon } from '@chakra-ui/icons'
import {
  Link,
  Button,
  AspectRatio,
  Image,
  HStack,
  useColorMode,
} from '@chakra-ui/react'

import { Link as LinkRW, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { thumbnailSize } from 'src/utility/helper'

const UserProfileLink = () => {
  const { logOut, currentUser } = useAuth()
  const { toggleColorMode } = useColorMode()
  return (
    <HStack alignItems="center">
      <MoonIcon boxSize="6" cursor="pointer" onClick={toggleColorMode} />
      <div className="text-center">
        <Link as={LinkRW} to={routes.userProfile()} key="5">
          <AspectRatio w="12" ratio={1 / 1}>
            <Image
              borderRadius="full"
              src={thumbnailSize(currentUser?.thumbnail)}
            />
          </AspectRatio>
        </Link>
        <Button onClick={logOut} variant="link" color="gray.400">
          登出
        </Button>
      </div>
    </HStack>
  )
}

export default UserProfileLink
