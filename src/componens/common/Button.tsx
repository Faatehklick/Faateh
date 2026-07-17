// import { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
}

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
};

const Button = ({ variant = 'primary', children, className = '', ...rest }: ButtonProps) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-[15px] font-semibold transition-colors ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;