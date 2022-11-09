import React from 'react'

import DesktopSearchBar from 'src/components/SearchBar/SearchBarDesktop'
import MobileSearchBar from 'src/components/SearchBar/SearchBarMobile'
import { trigger } from 'src/utility/event'

import StyleHeader from '../StyleHeader/StyleHeader'

const backgroundImage = {
  backgroundImage:
    'url(' +
    'https://images.unsplash.com/photo-1536300007881-7e482242baa5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80' +
    ')',
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
  return (
    <div
      className="relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144"
      style={backgroundImage}
      onClick={onClickHandler}
    >
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="relative px-6 sm:px-8 mx-auto h-full flex flex-col">
        <StyleHeader isHome={true}></StyleHeader>
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
      </div>
    </div>
  )
}
