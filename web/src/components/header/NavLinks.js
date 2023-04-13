import { Stack, Box } from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'

const NavLinks = (props) => {
  return (
    <Box alignItems="center" w="full" display={props.isHome ? 'flex' : 'none'}>
      <Stack
        spacing={[0, 0, 10]}
        direction={{ base: 'column', md: 'row' }}
        mx="auto"
      >
        <Link
          to={routes.blogs()}
          key="1"
          className=" text-gray-100 pb-1 px-2 transition duration-300 border-l-2 lg:border-l-0 lg:border-b-2 border-transparent hover:text-gray-300 hover:border-gray-300"
        >
          洞屋最新
        </Link>

        <Link
          to={routes.about()}
          key="2"
          className="text-gray-100 pb-1 px-2 transition duration-300 border-l-2 lg:border-l-0 lg:border-b-2 border-transparent hover:text-gray-300 hover:border-gray-300"
        >
          关于洞屋
        </Link>

        <Link
          to={routes.contact()}
          key="3"
          className=" text-gray-100 pb-1 px-2 transition duration-300 border-l-2 lg:border-l-0 lg:border-b-2 border-transparent hover:text-gray-300 hover:border-gray-300"
        >
          联系我们
        </Link>
      </Stack>
    </Box>
  )
}

export default NavLinks
