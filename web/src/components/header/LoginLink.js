import { Link } from '@chakra-ui/react'

import { Link as LinkRW, routes } from '@redwoodjs/router'

const LoginLink = () => (
  <Link
    as={LinkRW}
    to={routes.login()}
    key="4"
    minW={20}
    minH={87}
    lineHeight="87px"
    color="gray.100"
  >
    登录
  </Link>
)

export default LoginLink
