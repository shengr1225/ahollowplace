import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import useAnimatedNavToggler from 'src/helpers/useAnimatedNavToggler'
import { motion } from 'framer-motion'
import logo from '../../images/google-icon.png'
import { ReactComponent as MenuIcon } from 'feather-icons/dist/icons/menu.svg'
import { ReactComponent as CloseIcon } from 'feather-icons/dist/icons/x.svg'

const BlogLayout = ({ children }) => {
  const { logOut, isAuthenticated, currentUser } = useAuth()

  const links = [
    <div className="inline-block" key={1}>
      <Link to={routes.home}>洞屋最新</Link>
      <Link to={routes.about}>关于洞屋</Link>
      <Link to={routes.contact}>联系我们</Link>
      <Link to={routes.logIn} className="lg:ml-12!">
        登录
      </Link>
    </div>,
  ]

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler()
  const collapseBreakpointCss = collapseBreakPointCssMap['lg']
  const logoLink = (
    <Link
      className="flex items-center font-black border-b-0 text-2xl! ml-0!"
      to={routes.home}
    >
      <img className="w-10 mr-3" src={logo} alt="logo" />
      洞屋
    </Link>
  )

  return (
    <>
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
      <main className="max-w-4xl mx-auto p-12 bg-white shadow rounded-b">
        {children}
      </main>
    </>
  )
}

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

export default BlogLayout
