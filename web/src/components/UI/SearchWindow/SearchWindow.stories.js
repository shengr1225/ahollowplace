import SearchWindow from './SearchWindow'
import { useState } from 'react'

export default {
  title: "UI/SearchWindow",
  component: SearchWindow
}


export const Basic = () => {
  const [isOpen, setIsOpen] = useState(true)
  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <SearchWindow isOpen={isOpen} closeModal={closeModal} />
  )
}
