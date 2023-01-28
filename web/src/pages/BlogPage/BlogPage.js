import { useEffect, useState } from 'react'

import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { MetaTags } from '@redwoodjs/web'

const BlogPage = () => {
  const [content, setContent] = useState('')
  useEffect(() => {
    fetch('/admin/blog/2023-01-26-my-first-blog.md')
      .then((r) => r.text())
      .then((text) => {
        setContent(text)
      })
  })

  return (
    <>
      <MetaTags title="Blog" description="Blog page" />
      <h1>剧本博客</h1>
      <ReactMarkDown remarkPlugins={[remarkGfm]}>{content}</ReactMarkDown>
    </>
  )
}

export default BlogPage
