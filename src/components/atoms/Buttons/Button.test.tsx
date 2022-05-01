import { render } from '@testing-library/react'

import Button from './Button'
describe('Button', () => {
  it('should render', () => {
    const { container } = render(<Button>Hello</Button>)
    expect(container).toBeInTheDocument()
  })
  it('should render with variant=danger', () => {
    const button = render(<Button variant='danger'>Hello</Button>)
    expect(button.getByRole('button')).toHaveClass('bg-red-800')
    expect(button.getByText('Hello')).toHaveClass('bg-red-500 hover:bg-red-600')
  })
})
