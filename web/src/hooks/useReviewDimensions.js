import { useState, useEffect } from 'react'

import useWindowDimensions from './useWindowDimensions'

const xl = 1024
const sm = 768

const getDimensions = ({ width }) => {
  let containerWidth, containerHeight, marginTop, bgSize

  if (width > xl) {
    containerWidth = 1024 / 2.6 + 'px'
    containerHeight = 1024 / 1.68 + 'px'
    bgSize = '1024px'
  }
  if (width < xl) {
    bgSize = '900px'
    containerWidth = 900 / 2.6 + 'px'
    containerHeight = 900 / 1.68 + 'px'
  }
  if (width < sm) {
    bgSize = '768px'
    containerWidth = 768 / 2.6 + 'px'
    containerHeight = 768 / 1.68 + 'px'
  }

  marginTop = 40 + 'px'

  return {
    containerWidth,
    containerHeight,
    marginTop,
    bgSize,
  }
}

export default function useReviewDimensions(element) {
  const { width, height } = useWindowDimensions()

  const [originX, setOriginX] = useState(0)
  const [originY, setOriginY] = useState(0)

  useEffect(() => {
    function handleResize() {
      let offSetX
      let offSetY

      if (width > xl) {
        offSetX = 18
        offSetY = 52
      }
      if (width < xl) {
        offSetX = 18
        offSetY = 46
      }
      if (width < sm) {
        offSetX = 14
        offSetY = 34
      }

      setOriginX(element.current.clientWidth / 2 - offSetX + 'px')
      setOriginY(element.current.clientHeight / 2 - offSetY + 'px')
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [element, width])

  return {
    originX: originX,
    originY: originY,
    ...getDimensions({ width, height }),
  }
}
