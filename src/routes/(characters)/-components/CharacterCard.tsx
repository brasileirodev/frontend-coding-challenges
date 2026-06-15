import { Link } from "@tanstack/react-router";
import { FavoriteButton } from "@lib/components";
import { cn } from "@lib/utils";
import type { Character } from "@lib/constants/characters";

type CharacterCardProps = {
  character: Character;
  isFavorite: boolean;
  onFavoriteToggle: (characterId: string) => void;
  className?: string;
};

export const CharacterCard = ({
  character,
  isFavorite,
  onFavoriteToggle,
  className,
}: CharacterCardProps) => {
  const characterName = character.name || "Unknown character";

  return (
    <article
      className={cn(
        "relative isolate h-87.5 overflow-hidden rounded-2xl shadow-md shadow-zinc-950",
        className
      )}
    >
      <Link
        to="/characters/$characterId"
        params={{ characterId: character.id }}
        aria-label={`View details for ${characterName}`}
        className="flex h-full flex-col justify-end px-3 py-6 outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
      >
        <img
          src={character.image || undefined}
          alt={characterName}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-stone-900/20" />
        <h3 className="z-10 font-light tracking-wide">{characterName}</h3>
      </Link>

      <FavoriteButton
        subjectName={characterName}
        isFavorite={isFavorite}
        onToggle={() => onFavoriteToggle(character.id)}
        className="absolute top-3 right-3 z-20"
      />
    </article>
  );
};
