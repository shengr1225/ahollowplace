import { render } from '@redwoodjs/testing/web'

import BlogsPage from './BlogsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BlogPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BlogsPage />)
    }).not.toThrow()
  })
})
