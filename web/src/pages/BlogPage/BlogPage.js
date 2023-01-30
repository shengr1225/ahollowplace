import { useEffect, useState } from 'react'

import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { MetaTags } from '@redwoodjs/web'

import StyleHeader from 'src/components/header/header'

const BlogPage = () => {
  const [content, setContent] = useState('')
  useEffect(() => {
    fetch('/admin/blog/2023-01-26-my-first-blog.md')
      .then((r) => r.text())
      .then((text) => {
        let info = getHeader(text, '---')
        console.log(info)
        setContent(text)
      })
  })

  let getHeader = (str, signal) => {
    let firstIdx = str.indexOf(signal) + signal.length
    let secondIdx = str.indexOf(signal, firstIdx)
    return str.substring(firstIdx, secondIdx)
  }

  return (
    <>
      <MetaTags title="洞屋最新" description="洞屋动态|博客|随想|打本心得" />
      <div className="p-4 -mt-8">
        <StyleHeader dark={false} isHome={true} />
      </div>
      <div className="px-8 py-4 blog">
        <ReactMarkDown remarkPlugins={[remarkGfm]}>{content}</ReactMarkDown>
      </div>
    </>
  )
}

export default BlogPage
