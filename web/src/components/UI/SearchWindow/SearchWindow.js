import { useState, useEffect, useRef } from 'react'

import {
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  VStack,
  Stack,
  Box,
  Input,
  Text,
  HStack,
  useColorMode,
} from '@chakra-ui/react'
import { BiSearchAlt2 } from 'react-icons/bi'
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
  const { colorMode } = useColorMode()

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

  return (
    <Modal isOpen={props.isOpen} onClose={props.closeModal} size="full">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <JubenInput
            label="juben"
            name="剧本"
            placeholder="搜索剧本"
            inputRef={jubenInputRef}
            defaultValue={selectedJuben}
            onClickHandler={triggerJubenWindow}
            onSearch={onSearchJuben}
          />

          <JubenSelectionPopup isOpen={isJubenOpen} />
          <JubenSearchingPopup
            isOpen={isJubenSearchingOpen}
            name={searchText}
          />

          <TimeInput
            name="时间"
            dateRef={dateInputRef}
            defaultValue={selectedDate}
            onDateChange={onDateChange}
            colorMode={colorMode}
          />

          <PersonInput
            label="male|female"
            name="人数"
            placeholder="男|女"
            multi="2"
            refs={[maleInputRef, femaleInputRef]}
          />
        </ModalBody>
        <ModalFooter
          pos="fixed"
          bottom={0}
          backgroundColor="orange.200"
          py="2"
          w="full"
        >
          <Box w="full" zIndex={2}>
            <HStack justifyContent="space-between">
              <Button
                cursor="pointer"
                variant="link"
                color="blackAlpha.900"
                className="underline underline-offset-0 leading-9"
                onClick={onClearInput}
              >
                清空
              </Button>
              <Button
                variant="solid"
                backgroundColor="white"
                color="gray.900"
                onClick={onSearch.bind(this, props)}
              >
                <BiSearchAlt2 size="26" />
                <span ref={actionButtonRef}>Search</span>
              </Button>
            </HStack>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SearchWindow

const JubenSelectionPopup = (props) => (
  <Box
    p="4"
    borderRadius="2xl"
    style={windowCustomStyle}
    backgroundColor="whiteAlpha.100"
    className={props.isOpen ? '' : 'hidden'}
    onClick={(event) => {
      event.stopPropagation()
    }}
  >
    <HStack w="full" spacing="2" h="full">
      <Text display={{ base: 'none', md: 'block' }}>最近搜索</Text>
      <Box overflow="scroll" h="full">
        <VStack w="full">
          <Text>热门剧本</Text>
          <JubenThumbnailsCell />
        </VStack>
      </Box>
    </HStack>
  </Box>
)

const windowCustomStyle = {
  height: '345px',
}

const JubenSearchingPopup = (props) => (
  <Box
    className={props.isOpen ? '' : 'hidden'}
    onClick={(event) => {
      event.stopPropagation()
    }}
  >
    <Stack>
      <JubenSearchCell name={props.name} />
    </Stack>
  </Box>
)

const TimeInput = (props) => {
  return (
    <Box p="4" borderRadius="lg">
      <VStack spacing="4" justifyContent="flex-start" alignItems="start">
        <VStack spacing="2" justifyContent="flex-start" alignItems="start">
          <Heading fontSize="xl">{props.name}</Heading>
          <Input
            name="date"
            variant="unstyled"
            placeholder="添加时间"
            defaultValue={props.defaultValue}
            ref={props.dateRef}
          />
        </VStack>
        <DatePicker
          onChange={props.onDateChange}
          className={
            'mx-auto w-full' +
            (props.colorMode == 'dark' ? ' bg-gray-700' : ' bg-gray-200')
          }
        ></DatePicker>
      </VStack>
    </Box>
  )
}

const JubenInput = (props) => {
  return (
    <Box borderRadius="lg" p="4">
      <VStack spacing="2" justifyContent="flex-start" alignItems="start">
        <Heading fontSize="xl">{props.name}</Heading>
        <Input
          cursor="pointer"
          name="juben"
          placeholder="选择剧本"
          ref={props.inputRef}
          onChange={props.onSearch}
          defaultValue={props.defaultValue}
          key={props.defaultValue}
          onClick={props.onClickHandler}
          variant="unstyled"
        />
      </VStack>
    </Box>
  )
}

const PersonInput = (props) => {
  return (
    <Box p="4" mb="16">
      <VStack spacing="2" alignItems="start">
        <Heading fontSize="lg">{props.name}</Heading>
        <HStack spacing="2">
          <Input name="male" placeholder="男" ref={props.refs[0]} />
          <Input name="female" placeholder="女" ref={props.refs[1]} />
        </HStack>
      </VStack>
    </Box>
  )
}
