import { FC } from 'react'

type IInputProps = React.HTMLProps<HTMLInputElement>

const Input: FC<IInputProps> = (props) => {
  const { ...rest } = props
  return <input {...rest} />
}

export default Input
