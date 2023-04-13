import { Link, AspectRatio, Image } from '@chakra-ui/react'

import { Link as LinkRW, routes } from '@redwoodjs/router'

import logo from 'src/images/logo.png'

const Logo = (props) => (
  <Link
    as={LinkRW}
    to={routes.home()}
    display={props.isHome ? 'block' : { base: 'none', md: 'block' }}
  >
    <AspectRatio w="20" ratio={1 / 1}>
      <Image src={logo} alt="logo" borderRadius="full" />
    </AspectRatio>
  </Link>
)

export default Logo
