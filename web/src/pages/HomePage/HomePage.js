import Modal from 'react-modal'

import { MetaTags } from '@redwoodjs/web'

import JubensHighlightCell from 'src/cells/juben/HighlightCell/HighlightCell'
import Hero from 'src/components/lib/hero/HomeBase'

const HomePage = () => {
  // Modal.setAppElement('#redwood-app')
  return (
    <>
      <MetaTags title="首页" description="搜索剧本" />
      <div className="p-8">
        <Hero />
        <JubensHighlightCell />
      </div>
    </>
  )
}

export default HomePage
