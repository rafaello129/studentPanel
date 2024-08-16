import { cva } from 'class-variance-authority';
import React, { ButtonHTMLAttributes } from 'react';

// type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
type ButtonProps = React.DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'outlinePrimary'
    | 'outlineSecondary'
    | 'outlineDanger'
    | 'outlineSuccess'
    | 'outlineWarning';
  size?: 'small' | 'medium' | 'large';
};

export default function Button({
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${buttonVariants({ variant, size })} ${className}`.trim()}
    />
  );
}

const buttonVariants = cva('btn', {
  variants: {
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      danger: 'btn-danger',
      success: 'btn-success',
      warning: 'btn-warning',
      outlinePrimary: 'btn-outline-primary',
      outlineSecondary: 'btn-outline-secondary',
      outlineDanger: 'btn-outline-danger',
      outlineSuccess: 'btn-outline-success',
      outlineWarning: 'btn-outline-warning',
    },
    size: {
      small: 'btn-sm',
      medium: '',
      large: 'btn-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});
