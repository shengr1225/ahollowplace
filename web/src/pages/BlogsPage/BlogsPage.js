import { useEffect, useState } from 'react'

import { Heading, Box } from '@chakra-ui/react'
import { Octokit } from 'octokit'
import { MagnifyingGlass } from 'react-loader-spinner'

import { MetaTags } from '@redwoodjs/web'

import StyleHeader from 'src/components/header/header'
import BlogList from 'src/components/UI/BlogList/BlogList'
import { monthYearOnly } from 'src/utility/dateUtil'

const BlogsPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const octokit = new Octokit({
      auth: process.env.GITHUB_GET_CONTENT_TOKEN,
    })
    let loadBlogList = async () => {
      const files = await octokit.request(
        'GET /repos/{owner}/{repo}/contents/{path}{?ref}',
        {
          owner: 'shengr1225',
          repo: 'ahollowplace',
          path: 'web/public/admin/blog',
        }
      )
      const baseUrl = 'admin/blog/'

      Promise.allSettled(
        files.data?.map((file) =>
          fetch(baseUrl + file.name).then((res) => res.json())
        )
      ).then((res) => {
        res = res.map((r) => {
          if (r.status == 'rejected') {
            return
          }
          return {
            title: r.value.title,
            author: r.value.author,
            index: r.value.title.replace(',', '-'),
            date: monthYearOnly(r.value.date),
            tags: r.value.tags.join(','),
          }
        })
        res = res.filter((r) => !!r)
        console.log(res)
        setData(res)
      })
    }
    loadBlogList()
  }, [])

  return (
    <>
      <MetaTags title="洞屋最新" description="洞屋动态|博客|随想|打本心得" />
      <Box
        className="p-4 -mt-8"
        bgGradient="linear(to-r, pink.200, gray.300, gray.400, green.300)"
      >
        <StyleHeader dark={false} isHome={true} />
      </Box>
      <div className="px-8 py-4 mx-auto mt-16" style={{ 'max-width': '600px' }}>
        <Heading className="text-3xl font-extrabold mb-2">洞屋日志</Heading>
        {data.length == 0 && (
          <div>
            <MagnifyingGlass
              width="200"
              ariaLabel="loading"
              wrapperClass="mx-auto mt-5"
            />
          </div>
        )}
        {data.length > 0 && (
          <BlogList
            data={data}
            dateFilter={[...new Set(data.map((d) => d?.date))]}
            tagFilter={[
              ...new Set(
                data
                  .map((d) => d?.tags)
                  .join(',')
                  .split(',')
              ),
            ]}
          />
        )}
      </div>
    </>
  )
}

export default BlogsPage
