import { FC } from 'react';

import { Input, InputError, InputLabel } from '@/components/atoms';

interface IFormGroupProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  error?: string;
}

const FormGroup: FC<IFormGroupProps> = (props) => {
  const { label, error, ...rest } = props;
  return (
    <div>
      {label && <InputLabel label={label} htmlFor={rest.name} />}
      <Input id={rest.name} {...rest} />
      {error && <InputError error={error} />}
    </div>
  );
};

export default FormGroup;
