import React from 'react'
import { motion } from 'framer-motion'

import useAnimatedNavToggler from '../../helpers/useAnimatedNavToggler.js'

import logo from '../../images/logo.svg'
import { ReactComponent as MenuIcon } from 'feather-icons/dist/icons/menu.svg'
import { ReactComponent as CloseIcon } from 'feather-icons/dist/icons/x.svg'

export const NavLinks = tw.div`inline-block`

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`

export default ({
  roundedHeaderButton = false,
  logoLink,
  links,
  className,
  collapseBreakpointClass = 'lg',
}) => {
  /*
   * This header component accepts an optionals "links" prop that specifies the links to render in the navbar.
   * This links props should be an array of "NavLinks" components which is exported from this file.
   * Each "NavLinks" component can contain any amount of "NavLink" component, also exported from this file.
   * This allows this Header to be multi column.
   * So If you pass only a single item in the array with only one NavLinks component as root, you will get 2 column header.
   * Left part will be LogoLink, and the right part will be the the NavLinks component you
   * supplied.
   * Similarly if you pass 2 items in the links array, then you will get 3 columns, the left will be "LogoLink", the center will be the first "NavLinks" component in the array and the right will be the second "NavLinks" component in the links array.
   * You can also choose to directly modify the links here by not passing any links from the parent component and
   * changing the defaultLinks variable below below.
   * If you manipulate links here, all the styling on the links is already done for you. If you pass links yourself though, you are responsible for styling the links or use the helper styled components that are defined here (NavLink)
   */
  const defaultLinks = [
    <div className="inline-block" key={1}>
      <a href="/#">About</a>
      <a href="/#">Blog</a>
      <a href="/#">Pricing</a>
      <a href="/#">Contact Us</a>
      <a href="/#" tw="lg:ml-12!">
        Login
      </a>
      <a
        className={
          'lg:mx-0 px-8 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline border-b-0 rounded-full ' +
          roundedHeaderButton
        }
        href="/#"
      >
        Sign Up
      </a>
    </div>,
  ]

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler()
  const collapseBreakpointCss =
    collapseBreakPointCssMap[collapseBreakpointClass]

  const defaultLogoLink = (
    <a
      className="flex items-center font-black border-b-0 text-2xl! ml-0!"
      href="/"
    >
      <img className="w-10 mr-3" src={logo} alt="logo" />
      Treact
    </a>
  )

  logoLink = logoLink || defaultLogoLink
  links = links || defaultLinks

  return (
    <header
      className={
        'flex justify-between items-center max-w-screen-xl mx-auto' ||
        'header-light'
      }
    >
      <nav
        className={
          'hidden lg:flex flex-1 justify-between items-center ' +
          collapseBreakpointCss.desktopNavLinks
        }
      >
        {logoLink}
        {links}
      </nav>

      <nav
        className={
          'flex flex-1 items-center justify-between' +
          collapseBreakpointCss.mobileNavLinksContainer
        }
      >
        {logoLink}
        <motion.div
          className={
            'lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white' +
            collapseBreakpointCss.mobileNavLinks
          }
          initial={{ x: '150%', display: 'none' }}
          animate={animation}
        >
          <div className="flex flex-col items-center">{links}</div>
        </motion.div>
        <button
          onClick={toggleNavbar}
          className={
            'lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300 ' +
            (showNavLinks ? 'open' : 'closed')
          }
        >
          {showNavLinks ? (
            <CloseIcon tw="w-6 h-6" />
          ) : (
            <MenuIcon tw="w-6 h-6" />
          )}
        </button>
      </nav>
    </header>
  )
}

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: 'sm:hidden',
    desktopNavLinks: 'sm:flex',
    mobileNavLinksContainer: 'sm:hidden',
  },
  md: {
    mobileNavLinks: 'md:hidden',
    desktopNavLinks: 'md:flex',
    mobileNavLinksContainer: 'md:hidden',
  },
  lg: {
    mobileNavLinks: 'lg:hidden',
    desktopNavLinks: 'lg:flex',
    mobileNavLinksContainer: 'lg:hidden',
  },
  xl: {
    mobileNavLinks: 'lg:hidden',
    desktopNavLinks: 'lg:flex',
    mobileNavLinksContainer: 'lg:hidden',
  },
}
