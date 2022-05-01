import { render } from '@testing-library/react'

import Input from './Input'

describe('Input', () => {
  it('should render', () => {
    const input = render(<Input />)
    expect(input.container).toBeInTheDocument()
  })
  it('renders without crashing', () => {
    const input = render(<Input />)
    expect(input).toBeTruthy()
  })
  it('should render nane="test', () => {
    const { container } = render(<Input name='test' />)
    expect(container.querySelector(`input[name="test"]`)).toBeInTheDocument()
  })
})
