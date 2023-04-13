import { useState } from 'react'

import { useAnimation, useCycle } from 'framer-motion'

//Below logic is for toggling the navbar when toggleNavbar is called. It is used on mobile toggling of navbar.
export default function useAnimatedNavToggler() {
  const [showNavLinks, setShowNavLinks] = useState(false)
  const [y, cycleY] = useCycle('0', '-200')
  const animation = useAnimation()

  const toggleNavbar = () => {
    setShowNavLinks(!showNavLinks)
    animation.start({ y: y, display: 'block' })
    cycleY()
  }

  return { showNavLinks, animation, toggleNavbar }
}
