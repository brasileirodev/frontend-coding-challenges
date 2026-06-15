import type { HTMLAttributes } from "react";
import { cn } from "@lib/utils";

export type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  show?: boolean;
  wait?: `delay-${number}`;
};

export const Spinner = ({ show = true, wait = "delay-300", className, ...props }: SpinnerProps) => (
  <div
    role="status"
    aria-label="Loading"
    className={cn(
      "inline-block animate-spin px-3 transition",
      show ? `opacity-100 duration-500 ${wait}` : "opacity-0 delay-0 duration-500",
      className
    )}
    {...props}
  >
    <span
      aria-hidden="true"
      className="block size-5 rounded-full border-2 border-amber-100/35 border-t-amber-100"
    />
  </div>
);
