import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { MetaTags } from '@redwoodjs/web'

import StyleHeader from 'src/components/header/header'

const BlogPage = () => {
  return (
    <>
      <MetaTags title="洞屋最新" description="洞屋动态|博客|随想|打本心得" />
      <div className="p-4 -mt-8">
        <StyleHeader dark={false} isHome={true} />
      </div>
    </>
  )
}

export default BlogPage
