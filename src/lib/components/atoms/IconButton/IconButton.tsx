import type { ButtonHTMLAttributes } from "react";
import { cn } from "@lib/utils";

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> & {
  label: string;
  pressed?: boolean;
};

export const IconButton = ({
  label,
  pressed,
  className,
  children,
  type = "button",
  ...props
}: IconButtonProps) => (
  <button
    type={type}
    aria-label={label}
    aria-pressed={pressed}
    className={cn("rounded-full outline-none", className)}
    {...props}
  >
    {children}
  </button>
);
