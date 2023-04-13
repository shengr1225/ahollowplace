import { useState } from 'react'

import SearchWindow from '../UI/SearchWindow/SearchWindow'

const MobileSearchBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <div className="text-center md:hidden">
      <button
        className={
          'rounded-full px-8 py-3 mt-10 text-sm text-gray-lightest font-bold shadow transition duration-300 bg-primary-500 focus:bg-primary-700 hover:bg-primary-700 focus:text-gray-200 hover:text-gray-200 focus:outline-none focus:shadow-outline'
        }
        onClick={openModal}
      >
        搜索剧本
      </button>
      <SearchWindow isOpen={isOpen} closeModal={closeModal} />
    </div>
  )
}

export default MobileSearchBar
