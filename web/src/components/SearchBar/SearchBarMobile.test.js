import { render } from '@redwoodjs/testing/web'

import SearchBarMobile from './SearchBarMobile'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SearchBarMobile', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchBarMobile />)
    }).not.toThrow()
  })
})
