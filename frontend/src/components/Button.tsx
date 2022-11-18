import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-full rounded-xl border-2 border-brand-gray-800 bg-white py-2 text-xl ${className}`}
    >
      {children}
    </button>
  );
}
