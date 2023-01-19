import { useState, useEffect, useRef } from 'react'

import { BiSearchAlt2, BiXCircle } from 'react-icons/bi'
import Modal from 'react-modal'
import DatePicker from 'sassy-datepicker'

import { navigate, routes } from '@redwoodjs/router'

import { on, off, trigger } from 'src/utility/event'

import JubenSearchCell from '../../../cells/juben/SearchListCell/SearchListCell'
import JubenThumbnailsCell from '../../../cells/juben/SearchThumbnailCell/SearchThumbnailCell'

const onSearchJuben = (event) => {
  trigger('jubenSearchingWindow:open')
  trigger('jubenSearchTextChange', { text: event.target.value })
}

const SearchWindow = (props) => {
  const [isJubenOpen, setIsJubenOpen] = useState(false)
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

  useEffect(() => {
    on('juben:selected', onSelectJuben)
    return () => {
      off('juben:selected', onSelectJuben)
    }
  }, [isJubenOpen])

  const onSelectJuben = (data) => {
    setSelectedJuben(data.detail.name)
    closeJubenSearchingWindow()
    actionButtonRef.current.innerText = '下一步'
  }

  const triggerJubenWindow = (event) => {
    event.stopPropagation()
    setIsJubenSearchingOpen(false)
    setIsJubenOpen(!isJubenOpen)
  }

  const closeJubenWindow = () => {
    setIsJubenOpen(false)
  }

  const openJubenSearchingWindow = (event) => {
    event.stopPropagation()
    setIsJubenSearchingOpen(true)
    setIsJubenOpen(false)
  }

  const closeJubenSearchingWindow = () => {
    setIsJubenSearchingOpen(false)
  }

  const [selectedJuben, setSelectedJuben] = useState('')
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
    dateInputRef.current.value = dateStr
    setSelectedDate(dateStr)
    closeJubenSearchingWindow()
    closeJubenWindow()
  }

  const jubenInputRef = useRef()
  const dateInputRef = useRef()
  const maleInputRef = useRef()
  const femaleInputRef = useRef()
  const actionButtonRef = useRef()

  const onSearch = (props) => {
    if (!jubenInputRef.current.value) {
      return jubenInputRef.current.focus()
    }
    closeJubenSearchingWindow()
    closeJubenWindow()
    if (!selectedDate) {
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
    props.closeModal()
  }

  const onClearInput = () => {
    jubenInputRef.current.value = ''
    maleInputRef.current.value = ''
    femaleInputRef.current.value = ''
  }

  const customStyles = {
    content: {
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      margin: '0',
      padding: '0',
    },
  }
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
      className="transition-all absolute border-solid"
    >
      <div
        className={
          'flex-row bg-gray-100 relativeshadow-sm z-20 relative p-4 h-full'
        }
      >
        <BiXCircle
          className="hover:drop-shadow-md cursor-pointer"
          size="28"
          onClick={props.closeModal}
        />

        <JubenInput
          label="juben"
          name="剧本"
          placeholder="搜索剧本"
          inputRef={jubenInputRef}
          defaultValue={selectedJuben}
          onClick={triggerJubenWindow}
          onSearch={onSearchJuben}
        />

        <JubenSelectionPopup isOpen={isJubenOpen} />
        <JubenSearchingPopup isOpen={isJubenSearchingOpen} name={searchText} />

        <TimeInput
          name="时间"
          dateRef={dateInputRef}
          defaultValue={selectedDate}
          onDateChange={onDateChange}
        />

        <PersonInput
          label="male|female"
          name="人数"
          placeholder="男|女"
          multi="2"
          refs={[maleInputRef, femaleInputRef]}
        />
        <div
          className="fixed bg-gray-lightest border-gray-300 border-t"
          style={{ bottom: 0, left: 0, right: 0, height: '76px' }}
        >
          <div className="flex justify-between px-8 pt-4">
            <p
              className="underline underline-offset-0 leading-9 cursor-pointer"
              onClick={onClearInput}
            >
              清空
            </p>
            <button
              className="rounded-md bg-red-600 hover:bg-red-500 px-4 py-2 text-white"
              onClick={onSearch.bind(this, props)}
            >
              <BiSearchAlt2 className="inline pr-2" size="26" />
              <span ref={actionButtonRef}>Search</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SearchWindow

const JubenSelectionPopup = (props) => (
  <div
    style={windowCustomStyle}
    className={
      'rounded-xl bg-white drop-shadow-md transition-all ease-out duration-150 p-4 z-50 ' +
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
  </div>
)

const windowCustomStyle = {
  height: '345px',
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

const TimeInput = (props) => {
  return (
    <div className="flex flex-col rounded-lg px-8 py-4 cursor-pointer bg-gray-lightest my-2 drop-shadow-md">
      <span className="font-bold">{props.name}</span>
      <input
        name="date"
        className="outline-none text-black bg-transparent text-md border-none placeholder:text-gray-600"
        placeholder="添加时间"
        defaultValue={props.defaultValue}
        ref={props.dateRef}
      />
      <DatePicker
        onChange={props.onDateChange}
        className="mx-auto"
      ></DatePicker>
    </div>
  )
}

const JubenInput = (props) => {
  return (
    <button
      className="w-full rounded-lg px-8 py-4 cursor-pointer bg-gray-lightest my-4 drop-shadow-md text-left"
      onClick={props.onClick}
    >
      <p className="font-bold">{props.name}</p>
      <div key={props.defaultValue}>
        <input
          name="juben"
          className="block outline-none text-black bg-transparent text-md border-none placeholder:text-gray-600"
          placeholder="选择剧本"
          ref={props.inputRef}
          onChange={props.onSearch}
          defaultValue={props.defaultValue}
        />
      </div>
    </button>
  )
}

const PersonInput = (props) => {
  return (
    <div className="rounded-lg px-8 py-4 cursor-pointer bg-gray-lightest my-4 drop-shadow-md mb-24">
      <p className="font-bold">{props.name}</p>
      <input
        name="male"
        className={
          'w-1/2 outline-none bg-transparent border-none hover:bg-transparent hover:border-none focus:border-none placeholder:text-gray-600'
        }
        placeholder="男"
        ref={props.refs[0]}
      />
      <input
        name="female"
        className={
          'w-1/2 outline-none bg-transparent border-none hover:bg-transparent hover:border-none focus:border-none placeholder:text-gray-600'
        }
        placeholder="女"
        ref={props.refs[1]}
      />
    </div>
  )
}
