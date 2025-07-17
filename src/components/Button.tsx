import { type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

const variantStyles = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-300 text-black hover:bg-gray-400",
  ghost: "bg-transparent text-black hover:bg-gray-100",
};

const Button = ({ variant = "secondary", children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-sm text-sm transition-colors disabled:opacity-50 cursor-pointer",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
