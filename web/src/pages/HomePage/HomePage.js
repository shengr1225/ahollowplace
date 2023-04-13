import { useRef } from 'react'

import { Box } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import ActiveDrivesCell from 'src/cells/drive/ActiveDrivesCell'
import JubensHighlightCell from 'src/cells/juben/HighlightCell/HighlightCell'
import StyleHeader from 'src/components/header/header'
import Hero from 'src/components/lib/hero/HomeBase'
import { setRefsToScroll } from 'src/reducer/GlobalData'
const HomePage = () => {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  setRefsToScroll([ref1, ref2])
  return (
    <>
      <MetaTags title="首页" description="搜索剧本" />
      <Box
        p="8"
        h="full"
        overflow="auto"
        position="relative"
        style={{ scrollBehavior: 'smooth', scrollSnapType: 'y mandatory' }}
      >
        <Hero />
        <Box ref={ref1}>
          <ActiveDrivesCell />
        </Box>

        <Box ref={ref2}>
          <JubensHighlightCell />
        </Box>
      </Box>
    </>
  )
}

export default HomePage
