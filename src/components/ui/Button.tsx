import { cn } from "@/core/util/utils";
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:ring-offset-0",
    secondary:
      "bg-amber-500 text-white hover:bg-amber-600 focus:ring-2 focus:ring-amber-300 focus:ring-offset-0",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:ring-offset-0",
    ghost:
      "text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:ring-offset-0",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
