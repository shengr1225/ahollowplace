import { useState, useEffect, useRef } from 'react'

import { BiSearchAlt2 } from 'react-icons/bi'
import DatePicker from 'sassy-datepicker'

import { routes, navigate } from '@redwoodjs/router'

import SearchInput from 'src/components/UI/SearchInput'
import { on, off, trigger } from 'src/utility/event'

import JubenSearchCell from '../../cells/juben/SearchListCell/SearchListCell'
import JubenThumbnailsCell from '../../cells/juben/SearchThumbnailCell/SearchThumbnailCell'

const windowCustomStyle = {
  height: '345px',
}

const onSearchJuben = (event) => {
  trigger('jubenSearchingWindow:open')
  trigger('jubenSearchTextChange', { text: event.target.value })
}

const JubenSearchingPopup = (props) => (
  <button
    style={windowCustomStyle}
    className={
      'rounded-xl bg-white drop-shadow-md transition-all duration-150 p-4 w-2/3 overflow-scroll ' +
      (props.isOpen ? '' : 'hidden')
    }
    onClick={(event) => {
      event.stopPropagation()
    }}
  >
    <JubenSearchCell name={props.name} />
  </button>
)

const JubenSelectionPopup = (props) => (
  <button
    style={windowCustomStyle}
    className={
      'rounded-xl bg-white drop-shadow-md transition-all ease-out duration-150 p-4 ' +
      (props.isOpen ? '' : 'hidden')
    }
    onClick={(event) => {
      event.stopPropagation()
    }}
  >
    <div className="flex flex-row h-full">
      <div className="w-1/5 h-full px-3">
        <p className="text-gray-800">最近搜索</p>
      </div>
      <div className="w-4/5 border-l-2 border-gray-100 h-full px-8 overflow-auto">
        <p className="text-gray-800">热门剧本</p>
        <JubenThumbnailsCell />
      </div>
    </div>
  </button>
)

const DateSelectionPopup = (props) => (
  <div
    style={windowCustomStyle}
    className={
      'rounded-xl bg-white drop-shadow-md transition-all ease-out duration-150 p-4 ' +
      (props.isOpen ? '' : 'hidden')
    }
    onClick={(event) => {
      event.stopPropagation()
    }}
  >
    <DatePicker onChange={props.onDateChange} minDate={new Date()} />
  </div>
)

const DesktopSearchBar = () => {
  const [isJubenOpen, setIsJubenOpen] = useState(false)
  const [isDateOpen, setIsDateOpen] = useState(false)

  useEffect(() => {
    on('jubenWindow:close', closeJubenWindow)
    on('dateWindow:close', closeDateWindow)
    return () => {
      off('jubenWindow:close', closeJubenWindow)
      off('dateWindow:close', closeDateWindow)
    }
  }, [isJubenOpen, isDateOpen])

  const [isJubenSearchingOpen, setIsJubenSearchingOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    on('jubenSearchingWindow:open', openJubenSearchingWindow)
    on('jubenSearchingWindow:close', closeJubenSearchingWindow)
    return () => {
      off('jubenSearchingWindow:open', openJubenSearchingWindow)
      off('jubenSearchingWindow:close', closeJubenSearchingWindow)
    }
  })

  useEffect(() => {
    on('jubenSearchTextChange', ({ detail }) => {
      setSearchText(detail.text)
    })
    return () => {
      off('jubenSearchTextChange', ({ detail }) => {
        setSearchText(detail.text)
      })
    }
  }, [isJubenSearchingOpen])

  const openJubenWindow = (event) => {
    event.stopPropagation()
    setIsJubenOpen(true)
    setIsDateOpen(false)
    setIsJubenSearchingOpen(false)
  }
  const closeJubenWindow = () => {
    setIsJubenOpen(false)
  }
  const openDateWindow = (event) => {
    event.stopPropagation()
    setIsDateOpen(true)
    setIsJubenOpen(false)
    setIsJubenSearchingOpen(false)
  }
  const closeDateWindow = () => {
    setIsDateOpen(false)
  }
  const openJubenSearchingWindow = (event) => {
    event.stopPropagation()
    setIsJubenSearchingOpen(true)
    setIsJubenOpen(false)
    setIsDateOpen(false)
  }

  const closeJubenSearchingWindow = () => {
    setIsJubenSearchingOpen(false)
  }

  const [selectedJuben, setSelectedJuben] = useState('')

  useEffect(() => {
    on('juben:selected', onSelectJuben)
    return () => {
      off('juben:selected', onSelectJuben)
    }
  }, [isJubenOpen])

  const onSelectJuben = (data) => {
    setSelectedJuben(data.detail.name)
    closeJubenSearchingWindow()
  }

  const [selectedDate, setSelectedDate] = useState('')
  const onDateChange = (date) => {
    const dateObj = new Date(date)
    const dateStr =
      dateObj.getMonth() +
      1 +
      '/' +
      dateObj.getDate() +
      '/' +
      dateObj.getFullYear()
    setSelectedDate(dateStr)
  }

  const jubenInputRef = useRef()
  const dateInputRef = useRef()
  const maleInputRef = useRef()
  const femaleInputRef = useRef()

  const onSearch = () => {
    if (!jubenInputRef.current.value) {
      return jubenInputRef.current.focus()
    } else if (!selectedDate) {
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
        date: selectedDate,
        people: people,
      })
    )
  }

  return (
    <div>
      <div className="pl-4 hidden md:flex h-full md:h-auto divide-x relative rounded-full shadow-sm bg-gray-200 hover:bg-gray-100 transition-all duration-150 justify-between">
        <SearchInput
          label="juben"
          name="剧本"
          placeholder="搜索剧本"
          defaultValue={selectedJuben}
          onClick={openJubenWindow}
          inputRef={jubenInputRef}
          onSearch={onSearchJuben}
        />
        <SearchInput
          label="time"
          name="时间"
          placeholder="添加时间"
          onClick={openDateWindow}
          defaultValue={selectedDate}
          inputRef={dateInputRef}
        />
        <SearchInput
          label="male|female"
          name="人数"
          placeholder="男|女"
          multi="2"
          refs={[maleInputRef, femaleInputRef]}
        />
        <button
          className="rw-button text-lg bg-red md:rounded-full md:bg-clip-padding hover:bg-red-500 bg-red-600 py-5 px-5 text-white"
          onClick={onSearch}
        >
          <BiSearchAlt2 size="36" />
        </button>
      </div>
      <div className="relative mt-5">
        <JubenSearchingPopup isOpen={isJubenSearchingOpen} name={searchText} />
        <JubenSelectionPopup isOpen={isJubenOpen} />
        <DateSelectionPopup isOpen={isDateOpen} onDateChange={onDateChange} />
      </div>
    </div>
  )
}

export default DesktopSearchBar
