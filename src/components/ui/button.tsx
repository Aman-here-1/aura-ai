import React from "react";
import { cn } from "../../lib/utils"; 

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline:
      "border border-slate-300 bg-white hover:bg-slate-50",
    ghost:
      "hover:bg-slate-100",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}