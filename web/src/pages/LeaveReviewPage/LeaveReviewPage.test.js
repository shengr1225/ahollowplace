import { render } from '@redwoodjs/testing/web'

import LeaveReviewPage from './LeaveReviewPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LeaveReviewPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LeaveReviewPage />)
    }).not.toThrow()
  })
})
