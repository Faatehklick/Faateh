// import { InputHTMLAttributes, ReactNode } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

const Input = ({ icon, className = '', ...rest }: InputProps) => {
  return (
    <div className="flex items-center gap-2 px-3.5 py-2.5 text-gray-500 w-full">
      {icon}
      <input
        className={`w-full outline-none text-sm text-gray-900 bg-transparent ${className}`}
        {...rest}
      />
    </div>
  );
};

export default Input;