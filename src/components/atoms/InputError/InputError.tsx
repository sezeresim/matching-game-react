import { FC } from 'react'

interface IInputErrorProps {
  error: string
}

const InputError: FC<IInputErrorProps> = (props) => {
  const { error, ...rest } = props
  return <div {...rest}>{error}</div>
}

export default InputError
