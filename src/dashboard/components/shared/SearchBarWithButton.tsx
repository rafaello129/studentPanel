import { PropsWithChildren } from 'react';

type SearchBarWithButtonProps = PropsWithChildren & {
  query: string;
  placeholder?: string;
  ariaLabel?: string;
  setQuery: (query: string) => void;
};

export default function SearchBarWithButton({
  children,
  query,
  placeholder,
  ariaLabel,
  setQuery,
}: SearchBarWithButtonProps) {
  return (
    <div className='card container p-2'>
      <div className='d-flex flex-row gap-2'>
        <div className='input-group p-2'>
        </div>
        {children}
      </div>
    </div>
  );
}
