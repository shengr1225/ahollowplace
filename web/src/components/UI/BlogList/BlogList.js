import { useState } from 'react'

import { Heading, HStack, Text } from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'

const BlogList = (props) => {
  //data: an array of the dataset
  //dateFilter: an array of date filter of the dataset
  //tagFilter: an array of tag filter of the dataset

  const [selectedTags, setSelectedTags] = useState([])
  const [blogs, setBlogs] = useState(props.data)

  const onFilter = (tag) => {
    const index = selectedTags.indexOf(tag)
    if (index > -1) {
      selectedTags.splice(index, 1)
    } else {
      selectedTags.push(tag)
    }
    setSelectedTags(selectedTags)
    if (selectedTags.length) {
      setBlogs(
        props.data.filter((b) => {
          return selectedTags.every((t) => {
            return b.tags?.split(',').indexOf(t) > -1
          })
        })
      )
    } else {
      setBlogs(props.data)
    }
  }

  return (
    <div>
      {props.tagFilter.map((tag) => (
        <button
          className={
            `bg-primary-100 p-2 mr-2 text-gray-100 text-sm rounded-md cursor-pointer hover:bg-primary-300 mb-8 ` +
            (selectedTags.indexOf(tag) > -1 ? 'bg-green-500' : '')
          }
          key={tag}
          onClick={() => onFilter(tag)}
        >
          {tag}
        </button>
      ))}
      {props.dateFilter.map((date) => {
        const blogsOfDate = blogs.filter((d) => d.date === date)
        return (
          <div key={date} className="py-2">
            <Heading fontSize="lg" className="mt-4">
              {date} {blogsOfDate.length}篇
            </Heading>
            <div className="flex-row mt-2">
              {blogsOfDate.map((d) => (
                <Link to={routes.blog({ title: d.index })} key={d.index}>
                  <HStack className="text-lg font-bold">
                    <Text className="underline underline-offset-4">
                      {d.title}
                    </Text>
                    <Text className="text-sm ml-2">{d.author}</Text>
                  </HStack>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BlogList
