import type { ImgHTMLAttributes } from "react";
import { cn } from "@lib/utils";

export type DecorativeIconProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt">;

export const DecorativeIcon = ({ className, ...props }: DecorativeIconProps) => (
  <img alt="" aria-hidden="true" className={cn("h-5 w-auto shrink-0", className)} {...props} />
);
