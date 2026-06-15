import type { ButtonHTMLAttributes } from "react";
import { cn } from "@lib/utils";

export type ButtonVariant = "default" | "primary" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "hover:text-amber-100/60 focus:text-yellow-600/50 focus:ring-2 focus:ring-inset focus:ring-yellow-600/50",
  primary:
    "bg-yellow-600/60 text-amber-50 hover:bg-yellow-600/75 focus-visible:ring-2 focus-visible:ring-amber-200",
  ghost: "text-amber-200 hover:text-amber-100 focus-visible:ring-2 focus-visible:ring-amber-200",
};

export const Button = ({
  active = false,
  variant = "default",
  className,
  children,
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      "flex h-8 items-center rounded-lg px-5 font-medium whitespace-nowrap outline-none",
      active ? "bg-yellow-600/60 text-amber-50 shadow" : variantClasses[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
);
