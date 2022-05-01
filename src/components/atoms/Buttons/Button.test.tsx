import { render } from '@testing-library/react'

import Button from './Button'
describe('Button', () => {
  it('should render', () => {
    const { container } = render(<Button>Hello</Button>)
    expect(container).toBeInTheDocument()
  })
})
