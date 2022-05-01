import { FC } from 'react';

interface IInputLabelProps extends React.HTMLProps<HTMLLabelElement> {
  label: string;
}

const InputLabel: FC<IInputLabelProps> = (props) => {
  const { label, ...rest } = props;
  return (
    <label className='flex items-center' {...rest}>
      {label}
    </label>
  );
};

export default InputLabel;
