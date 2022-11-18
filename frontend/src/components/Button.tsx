import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full rounded-xl border-2 border-brand-gray-800 bg-white py-2 text-xl"
    >
      {children}
    </button>
  );
}
