import { useRef, useState } from 'react'

import { ReactComponent as MenuIcon } from 'feather-icons/dist/icons/menu.svg'
import { ReactComponent as CloseIcon } from 'feather-icons/dist/icons/x.svg'
import { motion } from 'framer-motion'
import { BiSearchAlt2 } from 'react-icons/bi'
import DatePicker from 'sassy-datepicker'

import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'

import SearchInput from 'src/components/UI/SearchInput'
import useAnimatedNavToggler from 'src/helpers/useAnimatedNavToggler'
import logo from 'src/images/logo.png'
import { dateOnly } from 'src/utility/dateUtil'
import { trigger } from 'src/utility/event'
import { thumbnailSize } from 'src/utility/helper'

import SearchWindow from '../UI/SearchWindow/SearchWindow'

const windowCustomStyle = {
  height: '345px',
}

const StyleHeader = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const onSearchJuben = (event) => {
    trigger('jubenSearchingWindow:open')
    trigger('jubenSearchTextChange', { text: event.target.value })
  }

  const { logOut, isAuthenticated, currentUser } = useAuth()

  const thumbnailBg = {
    backgroundImage: 'url(' + thumbnailSize(currentUser?.thumbnail) + ')',
    backgroundSize: '100%',
  }

  const [isDateOpen, setIsDateOpen] = useState(false)
  const onDateChange = (date) => {
    const dateObj = new Date(date)
    const dateStr =
      dateObj.getMonth() +
      1 +
      '/' +
      dateObj.getDate() +
      '/' +
      dateObj.getFullYear()
    dateInputRef.current.value = dateStr
  }

  const openDateWindow = (event) => {
    event.stopPropagation()
    setIsDateOpen(true)
  }

  const closeDateWindow = (event) => {
    event.stopPropagation()
    setIsDateOpen(false)
  }

  const jubenInputRef = useRef(null)
  const dateInputRef = useRef(null)
  const maleInputRef = useRef(null)
  const femaleInputRef = useRef(null)

  const onSearch = () => {
    if (!jubenInputRef.current.value) {
      return jubenInputRef.current.focus()
    } else if (!dateInputRef.current.value) {
      return dateInputRef.current.focus()
    } else if (!maleInputRef.current.value) {
      return maleInputRef.current.focus()
    } else if (!femaleInputRef.current.value) {
      return femaleInputRef.current.focus()
    }
    const people =
      maleInputRef.current.value + '|' + femaleInputRef.current.value
    navigate(
      routes.search({
        name: jubenInputRef.current.value,
        date: dateInputRef.current.value,
        people: people,
      })
    )
  }

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler()

  const searchSection = (
    <div className="bg-white">
      <div className="flex justify-between rounded-full border shadow-sm hover:shadow-md transition-shadow ease-in-out duration-300">
        <SearchInput
          label="juben"
          name="剧本"
          type="text"
          placeholder="搜索剧本"
          defaultValue={props.query?.name}
          inputRef={jubenInputRef}
          onSearch={onSearchJuben}
          className="border-r"
        />
        <SearchInput
          label="time"
          type="text"
          name="时间"
          placeholder="添加时间"
          onClick={openDateWindow}
          defaultValue={dateOnly(props.query?.date)}
          inputRef={dateInputRef}
          className="border-r"
        />
        <SearchInput
          label="male|female"
          name="人数"
          type="text"
          placeholder="男|女"
          multi="2"
          defaultValues={props.query?.people}
          refs={[maleInputRef, femaleInputRef]}
        />
        <button
          className="rw-button text-lg bg-red bg-red-600 py-5 px-5 text-white rounded-r-full"
          onClick={onSearch}
        >
          <BiSearchAlt2 size="36" />
        </button>
      </div>
      <div className="relative">
        <DateSelectionPopup
          isOpen={isDateOpen}
          onDateChange={onDateChange}
          onCloseWindow={closeDateWindow}
        />
      </div>
    </div>
  )

  const linkColor = props.dark
    ? 'text-gray-800 hover:text-gray-800 hover:border-gray-800'
    : 'text-gray-100 hover:border-gray-300 hover:text-gray-300'

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

  const collapseBreakpointCss = collapseBreakPointCssMap['lg']
  const logoLink = (
    <Link
      className="text-gray-100 hover:border-gray-300 hover:text-gray-300 flex font-black border-b-0 text-2xl! ml-0!"
      to={routes.home()}
    >
      <img className="w-20 h-20 mr-3 rounded-full" src={logo} alt="logo" />
    </Link>
  )

  const linksMobile = [
    <Link
      className={`text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent hover:border-primary-500 focus:text-primary-500 hover:text-primary-500 cursor-pointer`}
      to={routes.home()}
      key="1"
    >
      洞屋最新
    </Link>,
    <Link
      className="text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 focus:text-primary-500 hover:text-primary-500 cursor-pointer"
      to={routes.about()}
      key="2"
    >
      关于洞屋
    </Link>,
    <Link
      className="text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 focus:text-primary-500 hover:text-primary-500 cursor-pointer"
      to={routes.contact()}
      key="3"
    >
      联系我们
    </Link>,
  ]

  const linksDesktop = [
    <Link
      className={`text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent cursor-pointer ${linkColor}`}
      to={routes.home()}
      key="1"
    >
      洞屋最新
    </Link>,
    <Link
      className={`text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent cursor-pointer ${linkColor}`}
      to={routes.about()}
      key="2"
    >
      关于洞屋
    </Link>,
    <Link
      className={`text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent cursor-pointer ${linkColor}`}
      to={routes.contact()}
      key="3"
    >
      联系我们
    </Link>,
  ]

  const loginLink = (
    <Link
      className="bg-primary-500 px-4 py-3 rounded-xl text-sm hover:bg-primary-700 transition duration-300"
      to={routes.login()}
      key="4"
    >
      登录
    </Link>
  )

  const UserProfileLink = (props) => {
    return (
      <div className="text-center">
        <Link to={routes.userProfile({ id: props.currentUser?.id })} key="5">
          <div
            className="bg-center w-12 h-12 rounded-full mx-auto"
            style={thumbnailBg}
          ></div>
        </Link>
        <button
          onClick={logOut}
          className={`border-transparent border-b-2 transition duration-300 ${linkColor}`}
        >
          登出
        </button>
      </div>
    )
  }

  return (
    <>
      <header
        className={
          'pt-8 w-full flex justify-between max-w-screen-xl mx-auto' ||
          'header-light'
        }
      >
        <nav
          className={
            'hidden lg:flex flex-1 justify-between ' +
            collapseBreakpointCss.desktopNavLinks
          }
        >
          {logoLink}
          <div className="inline-block self-center" key="1">
            {props.showSearching ? searchSection : linksDesktop}
          </div>
          <div className="inline-block text-gray-200 self-center" key="2">
            {isAuthenticated && currentUser ? (
              <UserProfileLink currentUser={currentUser} />
            ) : (
              loginLink
            )}
          </div>
        </nav>

        <nav
          className={
            'flex flex-initial items-center justify-between w-full ' +
            collapseBreakpointCss.mobileNavLinksContainer
          }
        >
          {logoLink}
          <button
            onClick={openModal}
            className={
              'w-2/3 bg-white text-sm px-2 py-1 justify-between rounded-full border shadow-sm hover:shadow-md transition-shadow ease-in-out duration-300 items-center ' +
              (props.isHome ? 'hidden' : 'flex')
            }
          >
            <input
              readOnly
              className="border-r px-2 w-1/3"
              defaultValue="什么剧本"
              value={props.query?.name}
            ></input>
            <input
              readOnly
              className="border-r px-2 w-1/3"
              defaultValue="什么时间"
              value={props.query?.date}
            ></input>
            <input
              readOnly
              className="px-2 w-1/3"
              defaultValue="多少人"
              value={props.query?.people}
            ></input>
            <span className="text-sm bg-red bg-red-600 text-white rounded-full p-2">
              <BiSearchAlt2 size="18" />
            </span>
          </button>
          <motion.div
            className={
              'lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white ' +
              collapseBreakpointCss.mobileNavLinks
            }
            initial={{ x: '150%', display: 'none' }}
            animate={animation}
          >
            <div className="flex flex-col items-center">{linksMobile}</div>
            <div className="flex flex-col items-center text-gray-200">
              {isAuthenticated && currentUser ? (
                <UserProfileLink currentUser={currentUser} />
              ) : (
                loginLink
              )}
            </div>
          </motion.div>
          <button
            onClick={toggleNavbar}
            className={
              'lg:hidden z-10 focus:outline-none focus:text-primary-500 hover:text-primary-500 transition duration-300 ' +
              (showNavLinks
                ? 'open'
                : 'closed text-gray-100 hover:text-primary-500') +
              (props.dark ? ' text-gray-800' : ' text-gray-100')
            }
          >
            {showNavLinks ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </nav>
        <SearchWindow isOpen={isOpen} closeModal={closeModal} />
      </header>
    </>
  )
}

export default StyleHeader

const DateSelectionPopup = (props) => (
  <div
    style={windowCustomStyle}
    className={
      'rounded-xl relative drop-shadow-md bg-white transition-all ease-out duration-150 mx-auto text-center p-4 ' +
      (props.isOpen ? '' : 'hidden')
    }
  >
    <button
      className="absolute text-gray-800 top-0 right-0 mt-5 mr-5 border-2 border-gray-800 px-2 rounded-md hover:bg-gray-200"
      onClick={props.onCloseWindow}
    >
      x
    </button>
    <DatePicker
      onChange={props.onDateChange}
      minDate={new Date()}
      className="mx-auto"
    />
  </div>
)
