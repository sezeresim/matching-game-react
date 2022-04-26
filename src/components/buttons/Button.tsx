import cn from 'classnames';
import React from 'react';

enum ButtonVariant {
  'primary',
  'danger',
  'success',
}

export interface IButtonProps {
  children?: React.ReactNode;
  variant?: keyof typeof ButtonVariant;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = (props) => {
  const { children, variant = 'primary', className, ...rest } = props;

  return (
    <button
      className={cn('pushable', [
        variant == 'primary' && 'bg-blue-800',
        variant == 'danger' && 'bg-red-800',
        variant == 'success' && 'bg-green-800',
        className && className,
      ])}
      {...rest}
    >
      <span
        className={cn('front', [
          variant == 'primary' && 'bg-blue-500 hover:bg-blue-600',
          variant == 'danger' && 'bg-red-500 hover:bg-red-600',
          variant == 'success' && 'bg-green-500 hover:bg-green-600',
        ])}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
