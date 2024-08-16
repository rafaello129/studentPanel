import { cva } from 'class-variance-authority';
import { ChangeEvent, PropsWithChildren } from 'react';

type SelectProps = PropsWithChildren & {
  size?: 'sm' | 'md' | 'lg';
  name?: string;
  id?: string;
  value?: string | number | readonly string[];
  ariaLabel?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

function Select({ size, ariaLabel, ...props }: SelectProps) {
  return (
    <select
      className={selectVariants({ size })}
      aria-label={ariaLabel}
      {...props}
    />
  );
}

const selectVariants = cva('form-select', {
  variants: {
    size: {
      sm: 'form-select-sm',
      md: '',
      lg: 'form-select-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type SelectOptionProps = PropsWithChildren & {
  value?: string | number | readonly string[];
  selected?: boolean;
};

function SelectOption({ value, selected, ...props }: SelectOptionProps) {
  return <option value={value} selected={selected} {...props} />;
}

Select.Option = SelectOption;

export default Select;
