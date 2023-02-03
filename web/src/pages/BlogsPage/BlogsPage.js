import { useEffect, useState } from 'react'

import { Octokit } from 'octokit'

import { MetaTags } from '@redwoodjs/web'

import StyleHeader from 'src/components/header/header'
import BlogList from 'src/components/UI/BlogList/BlogList'
import { monthYearOnly, yearMonthDate } from 'src/utility/dateUtil'

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

      Promise.all(
        files.data?.map((file) =>
          fetch(baseUrl + file.name).then((res) => res.json())
        )
      ).then((res) => {
        res = res.map((r) => {
          r.index = r.title.replace(',', '-')
          r.date = monthYearOnly(r.date)
          r.tags = r.tags.join(',')
          return r
        })
        setData(res)
      })
    }
    loadBlogList()
  }, [])

  return (
    <>
      <MetaTags title="洞屋最新" description="洞屋动态|博客|随想|打本心得" />
      <div className="p-4 -mt-8">
        <StyleHeader dark={false} isHome={true} />
      </div>
      <div className="px-8 py-4 blog">
        <p className="text-3xl font-extrabold">洞屋日志</p>
        {data.length && (
          <BlogList
            data={data}
            dateFilter={[...new Set(data.map((d) => d.date))]}
            tagFilter={[
              ...new Set(
                data
                  .map((d) => d.tags)
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
