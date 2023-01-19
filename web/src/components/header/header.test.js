import { render } from '@redwoodjs/testing/web'

import StyleHeader from './header'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StyleHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StyleHeader />)
    }).not.toThrow()
  })
})
