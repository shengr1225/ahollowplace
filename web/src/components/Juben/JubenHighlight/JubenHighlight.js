import { useState } from 'react'

import { motion } from 'framer-motion'
import Lightbox from 'react-image-lightbox'

import { JubenSectionAnimation } from 'src/helpers/Animation'
import { highlightSize } from 'src/utility/helper'

const JubenHighlight = ({ juben, reversed }) => {
  const Image = () => (
    <div
      className="rounded md:w-1/2 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4"
      style={{ backgroundImage: 'url(' + highlightSize(juben.image) + ')' }}
    ></div>
  )

  const Subtitle = () => (
    <div className="font-bold tracking-wide text-secondary-100">
      {juben.players + '人 ' + juben.sections}
    </div>
  )

  const Title = () => (
    <h4 className="text-3xl font-bold text-gray-900">{juben.name}</h4>
  )
  const Description = () => (
    <p className="mt-2 text-sm leading-loose whitespace-pre-line md:whitespace-normal lg:whitespace-pre">
      {juben.desc.replace(/\\n/g, '\n')}
    </p>
  )

  const photos = juben.photos?.split(',')
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  return (
    <motion.div
      initial={reversed ? 'offscreenReversed' : 'offscreen'}
      variants={JubenSectionAnimation[juben.section]}
      whileInView={'onscreen'}
      viewport={JubenSectionAnimation.viewport}
      className={
        'mt-24 md:flex justify-center items-center ' +
        (reversed ? 'flex-row-reverse' : 'flex-row')
      }
    >
      <Image />
      <div className="mt-4 md:mt-0 mx-4 sm:mx-8 md:mx-4 lg:mx-8">
        <Subtitle></Subtitle>
        <Title></Title>
        <Description></Description>
        {isOpen && photos && (
          <Lightbox
            mainSrc={photos[photoIndex]}
            nextSrc={photos[(photoIndex + 1) % photos.length]}
            prevSrc={photos[(photoIndex + photos.length - 1) % photos.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + photos.length - 1) % photos.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % photos.length)
            }
          />
        )}
        <button
          onClick={() => {
            setIsOpen(true)
          }}
          className="inline-block mt-4 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500"
        >
          查看详情
        </button>
      </div>
    </motion.div>
  )
}

export default JubenHighlight
