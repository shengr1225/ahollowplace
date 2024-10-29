import { useState } from 'react'

import { Heading, Text, Button, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Lightbox from 'react-image-lightbox'

import { JubenSectionAnimation } from 'src/components/lib/helpers/Animation'
import { highlightSize } from 'src/utility/helper'

const JubenHighlight = ({ juben, reversed }) => {
  const headingColor = useColorModeValue(
    'linear(to-l, #7928CA, #FF0080)',
    'linear(to-tr, teal.300, yellow.400)'
  )
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const Image = () => (
    <div
      className="rounded md:w-1/2 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4"
      style={{ backgroundImage: 'url(' + highlightSize(juben.image) + ')' }}
    ></div>
  )

  const Subtitle = () => (
    <Heading bgGradient={headingColor} bgClip="text" fontSize="md">
      {juben.players + '人 ' + juben.sections}
    </Heading>
  )

  const Title = () => (
    <Heading fontSize="3xl" mt="2">
      {juben.name}
    </Heading>
  )

  const Description = () => (
    <Text
      color={textColor}
      fontSize="sm"
      mt="8"
      className="leading-loose whitespace-pre-line md:whitespace-normal"
    >
      {juben.desc.replace(/\\n/g, '\n')}
    </Text>
  )

  const photos = juben.photos?.split(',')
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  return (
    <motion.div
      initial={reversed ? 'start2' : 'start'}
      variants={JubenSectionAnimation[juben.section]}
      whileInView={'end'}
      viewport={JubenSectionAnimation.viewport}
      className={
        'mt-24 mt-8 md:flex justify-center items-center ' +
        (reversed ? 'flex-row-reverse' : 'flex-row')
      }
    >
      <Image />
      <div className="mt-4 md:mt-0 mx-4 sm:mx-8 md:mx-4 mx-8">
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
        <Button
          mt="4"
          colorScheme="teal"
          variant="link"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          查看详情
        </Button>
      </div>
    </motion.div>
  )
}

export default JubenHighlight
