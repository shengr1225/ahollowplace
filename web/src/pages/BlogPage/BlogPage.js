import { useEffect, useState } from 'react'

import ReactMarkdown from 'react-markdown'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import StyleHeader from 'src/components/header/header'
import { blogDate } from 'src/utility/dateUtil'

const BlogPage = ({ title }) => {
  const [blog, setBlog] = useState({})
  const baseUrl = '/admin/blog/'
  useEffect(() => {
    fetch(baseUrl + title + '.json')
      .then((res) => res.json())
      .then((result) => {
        result.date = blogDate(result.date)
        setBlog(result)
      })
  }, [title])
  return (
    <>
      <MetaTags title="洞屋最新" description="洞屋动态|博客|随想|打本心得" />
      <div className="p-4 -mt-8">
        <StyleHeader dark={false} isHome={true} />
      </div>

      <div className="px-8 py-6">
        <Link className="text-gray-600 text-xl font-bold" to={routes.blogs()}>
          Back
        </Link>
        <div className=" text-gray-600 mt-8 mb-4">{blog.date}</div>
        <div className=" text-gray-900 text-4xl font-bold mb-4">
          {blog.title}
        </div>
        <ReactMarkdown>{blog.body}</ReactMarkdown>
      </div>
    </>
  )
}

export default BlogPage
