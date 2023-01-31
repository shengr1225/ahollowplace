import { Link, routes } from '@redwoodjs/router'

const BlogList = (props) => {
  //data: an array of the dataset
  //dateFilter: an array of date filter of the dataset
  //tagFilter: an array of tag filter of the dataset

  return (
    <div>
      {props.dateFilter.map((date) => {
        const blogsOfDate = props.data.filter((d) => d.date === date)
        return (
          <div key={date}>
            <p className="text-gray-600 mt-4">
              {date} {blogsOfDate.length}篇
            </p>
            <div className="flex-row mt-2">
              {blogsOfDate.map((d) => (
                <Link to={routes.blog({ title: d.index })} key={d.index}>
                  <p className=" text-primary-700 text-lg font-bold">
                    {d.title}
                    <span className="text-gray-500 text-sm ml-2">
                      {d.author}
                    </span>
                  </p>
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
