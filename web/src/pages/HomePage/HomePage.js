import Modal from 'react-modal'

import { MetaTags } from '@redwoodjs/web'

import Hero from 'src/components/hero/HomeBase'
import JubensHighlightCell from 'src/components/Juben/JubensHighlightCell'

const HomePage = () => {
  Modal.setAppElement('#redwood-app')
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className="p-8">
        <Hero />
        <JubensHighlightCell />
      </div>
    </>
  )
}

export default HomePage
