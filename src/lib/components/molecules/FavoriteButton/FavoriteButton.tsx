import { Star } from "lucide-react";
import { IconButton, type IconButtonProps } from "@lib/components/atoms";
import { cn } from "@lib/utils";

export type FavoriteButtonProps = Omit<
  IconButtonProps,
  "children" | "label" | "onClick" | "pressed"
> & {
  isFavorite: boolean;
  onToggle: () => void;
  subjectName: string;
};

export const FavoriteButton = ({
  isFavorite,
  onToggle,
  subjectName,
  className,
  ...props
}: FavoriteButtonProps) => (
  <IconButton
    label={`${isFavorite ? "Remove" : "Add"} ${subjectName} ${
      isFavorite ? "from" : "to"
    } favorites`}
    pressed={isFavorite}
    onClick={onToggle}
    className={cn(
      "p-2 text-[#F1DBB5]/80 hover:bg-black/35 hover:text-[#F1DBB5] focus-visible:ring-2 focus-visible:ring-[#F1DBB5]",
      className
    )}
    {...props}
  >
    <Star
      aria-hidden="true"
      size={20}
      strokeWidth={1.5}
      fill={isFavorite ? "currentColor" : "none"}
    />
  </IconButton>
);
