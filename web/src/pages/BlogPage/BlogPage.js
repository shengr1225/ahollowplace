import { useEffect, useState } from 'react'

import { Box, Heading } from '@chakra-ui/react'
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
      <Box
        className="p-4 -mt-8"
        bgGradient="linear(to-r, pink.200, gray.300, gray.400, green.300)"
      >
        <StyleHeader dark={false} isHome={true} />
      </Box>

      <Box className="px-8 py-6" maxW="650" mx="auto" mt="16">
        <Link className="text-gray-600 text-xl font-bold" to={routes.blogs()}>
          Back
        </Link>
        <div className="text-gray-600 mt-8 mb-2">
          {blog.date} {blog.author}
        </div>
        <Heading fontSize="4xl" mb="2">
          {blog.title}
        </Heading>
        <div className="flex">
          {blog.tags?.map((tag) => (
            <button
              key={tag}
              className="rounded bg-primary-600 p-1 text-gray-100 text-sm mr-2 mb-4"
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="blog">
          <ReactMarkdown>{blog.body}</ReactMarkdown>
        </div>
      </Box>
    </>
  )
}

export default BlogPage
