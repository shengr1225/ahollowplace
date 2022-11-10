import Modal from 'react-modal'

import { MetaTags } from '@redwoodjs/web'

import Hero from 'src/components/hero/HomeBase'
import JubensHighlightCell from 'src/components/Juben/JubensHighlightCell'

const HomePage = () => {
  Modal.setAppElement('#redwood-app')
  return (
    <>
      <MetaTags title="首页" description="查看剧本或者开始搜索" />
      <div className="p-8">
        <Hero />
        <JubensHighlightCell />
      </div>
    </>
  )
}

export default HomePage
