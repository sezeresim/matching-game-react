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
  it('button click', () => {
    const onClick = jest.fn()
    const button = render(<Button onClick={onClick}>Hello</Button>)
    button.getByRole('button').click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })
  it('custom className', () => {
    const button = render(<Button className='custom'>Hello</Button>)
    expect(button.getByRole('button')).toHaveClass('custom')
  })
})
