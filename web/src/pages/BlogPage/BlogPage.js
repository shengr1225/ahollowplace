import { useEffect, useState } from 'react'

// import ReactMarkDown from 'react-markdown'
import ReactMarkdown from 'markdown-to-jsx'

import { MetaTags } from '@redwoodjs/web'

const BlogPage = () => {
  const [content, setContent] = useState('')
  useEffect(() => {
    fetch('/admin/blog/2023-01-23-testing.md')
      .then((r) => r.text())
      .then((text) => {
        setContent(text)
      })
  })

  return (
    <>
      <MetaTags title="Blog" description="Blog page" />
      <h1>BlogPage</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </>
  )
}

export default BlogPage
