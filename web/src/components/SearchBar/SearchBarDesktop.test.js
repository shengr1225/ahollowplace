import { render } from '@redwoodjs/testing/web'

import SearchBarDesktop from './SearchBarDesktop'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SearchBarDesktop', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchBarDesktop />)
    }).not.toThrow()
  })
})
