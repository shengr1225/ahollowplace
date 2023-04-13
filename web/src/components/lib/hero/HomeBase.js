import React from 'react'

import { Box } from '@chakra-ui/react'
import Lottie from 'react-lottie'

import StyleHeader from 'src/components/header/header'
import DesktopSearchBar from 'src/components/SearchBar/SearchBarDesktop'
import MobileSearchBar from 'src/components/SearchBar/SearchBarMobile'
import eyesAnimation from 'src/lottie/eyes_animation.json'
import { getRefToScrollByIndex } from 'src/reducer/GlobalData'
import { trigger } from 'src/utility/event'

const backgroundImage = {
  backgroundImage:
    'url(' +
    'https://images.unsplash.com/photo-1536300007881-7e482242baa5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80' +
    ')',
  scrollSnapAlign: 'start',
}

const SearchBar = () => (
  <div className="mt-4 md:mt-12 w-full md:w-auto">
    <DesktopSearchBar />
    <MobileSearchBar />
  </div>
)

const onClickHandler = () => {
  trigger('jubenWindow:close')
  trigger('dateWindow:close')
}

export default () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: eyesAnimation,
    rendererSettings: {
      // preserveAspectRatio: "xMidYMid slice"
    },
  }
  return (
    <div
      className="relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144"
      style={backgroundImage}
      onClick={onClickHandler}
    >
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="relative px-6 sm:px-8 mx-auto h-full flex flex-col">
        <StyleHeader isHome={true} dark={true}></StyleHeader>
        <div className="px-4 flex flex-1 flex-col justify-center items-center">
          <h1 className="text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0">
            <span className="inline-block mt-2">
              洞屋剧本杀
              <br />
              聆听你不一样的人生
            </span>
          </h1>
          <SearchBar></SearchBar>
        </div>
        <Box
          b="0"
          mx="auto"
          w="80px"
          onClick={() => {
            const ref = getRefToScrollByIndex(0)
            ref?.current.scrollIntoView()
          }}
        >
          <Lottie options={defaultOptions} height={80} width={80} />
        </Box>
      </div>
    </div>
  )
}
