import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@lib/utils";

export type FeedbackStateProps = HTMLAttributes<HTMLDivElement> & {
  actions?: ReactNode;
  description?: ReactNode;
  title: ReactNode;
  variant?: "inline" | "page";
};

export const FeedbackState = ({
  actions,
  className,
  description,
  title,
  variant = "inline",
  ...props
}: FeedbackStateProps) => {
  const isPage = variant === "page";
  const Title = isPage ? "h2" : "p";

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center",
        isPage ? "mx-auto w-full max-w-xl flex-1 justify-center gap-5 px-6" : "gap-2 py-20",
        className
      )}
      {...props}
    >
      <Title className={isPage ? "text-2xl font-bold text-[#F1DBB5]" : "text-lg text-amber-200/60"}>
        {title}
      </Title>
      {description && (
        <p className={isPage ? "text-sm leading-6 text-[#F1DBB5]/60" : "text-sm text-amber-200/30"}>
          {description}
        </p>
      )}
      {actions}
    </div>
  );
};
