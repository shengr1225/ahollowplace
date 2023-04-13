import { useState, useRef } from 'react'

import { Button, Box, HStack, VStack, useColorMode } from '@chakra-ui/react'
import { BiSearchAlt2 } from 'react-icons/bi'
import DatePicker from 'sassy-datepicker'

import { useLocation } from '@redwoodjs/router'
import { navigate, routes } from '@redwoodjs/router'

import SearchInput from 'src/components/UI/SearchInput'
import { dateOnly } from 'src/utility/dateUtil'
import { trigger } from 'src/utility/event'

const SeachBarDesktop = (props) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const { colorMode } = useColorMode()
  const onSearchJuben = (event) => {
    trigger('jubenSearchingWindow:open')
    trigger('jubenSearchTextChange', { text: event.target.value })
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

  return (
    <Box display={props.isHome ? 'none' : 'flex'}>
      <Box display={{ base: 'none', lg: 'flex' }}>
        <VStack alignItems="center">
          <Box
            borderRadius="full"
            border="1px"
            boxShadow="xs"
            // bg="gray.900"
            pl={6}
            _hover={{ boxShadow: 'dark' }}
          >
            <HStack justifyContent="space-around">
              <SearchInput
                label="juben"
                name="剧本"
                type="text"
                placeholder="搜索剧本"
                defaultValue={queryParams.get('name')}
                inputRef={jubenInputRef}
                onSearch={onSearchJuben}
                className="border-r"
              />
              <SearchInput
                label="time"
                type="text"
                name="时间"
                placeholder="添加时间"
                isOpen={isDateOpen}
                onClick={openDateWindow}
                onClose={closeDateWindow}
                defaultValue={dateOnly(queryParams.get('date'))}
                inputRef={dateInputRef}
                className="border-r"
              />
              <SearchInput
                label="male|female"
                name="人数"
                type="text"
                placeholder="男|女"
                multi="2"
                defaultValues={queryParams.get('people')}
                refs={[maleInputRef, femaleInputRef]}
              />
              <Button
                onClick={onSearch}
                variant="ghost"
                height="full"
                py={6}
                pr={6}
                roundedRight="full"
              >
                <BiSearchAlt2 size="36" my="auto" />
              </Button>
            </HStack>
          </Box>
          <DateSelectionPopup
            isOpen={isDateOpen}
            onDateChange={onDateChange}
            colorMode={colorMode}
          />
        </VStack>
      </Box>
    </Box>
  )
}

const DateSelectionPopup = (props) => (
  <Box borderRadius="xl" dropShadow="md" display={props.isOpen ? '' : 'none'}>
    <DatePicker
      onChange={props.onDateChange}
      minDate={new Date()}
      className={'mx-auto'}
    />
  </Box>
)

export default SeachBarDesktop
