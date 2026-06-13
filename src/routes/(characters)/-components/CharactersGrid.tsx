import { useState } from "react";
import { Spinner } from "@lib/components/Spinner";
import { Button } from "@lib/components/Button";
import { CharacterCard } from "./CharacterCard";
import { useCharacters } from "../-hooks/useCharacters";
import { useAppStore } from "@lib/hooks/useAppStore";
import { characterFilters, type CharacterFilterType } from "@lib/constants/filters";

const filterLabels: Record<CharacterFilterType, string> = {
  students: "Students",
  staff: "Staff",
  favorite: "Favorite",
};

export const CharactersGrid = () => {
  const [filter, setFilter] = useState<CharacterFilterType | null>(null);
  const { characters, isLoading, isError } = useCharacters();
  const favoriteCharacterIds = useAppStore((state) => state.favoriteCharacterIds);
  const toggleFavoriteCharacter = useAppStore((state) => state.toggleFavoriteCharacter);

  const visibleCharacters = characters.filter((character) => {
    if (filter === "students") return character.hogwartsStudent;
    if (filter === "staff") return character.hogwartsStaff;
    if (filter === "favorite") return favoriteCharacterIds.includes(character.id);
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-lg text-amber-200/60">Something went wrong while fetching characters.</p>
        <p className="text-sm text-amber-200/30">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="mx-auto flex max-w-full gap-1 overflow-x-auto rounded-xl bg-black/15 p-1">
        <Button type="button" active={filter === null} onClick={() => setFilter(null)}>
          All Characters
        </Button>
        {characterFilters.map((characterFilter) => (
          <Button
            key={characterFilter}
            type="button"
            active={filter === characterFilter}
            onClick={() => setFilter(characterFilter)}
          >
            {filterLabels[characterFilter]}
          </Button>
        ))}
      </div>

      {visibleCharacters.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-20 text-center">
          <p className="text-lg text-amber-200/60">No characters found.</p>
          <p className="text-sm text-amber-200/30">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="container mx-auto grid w-min grid-cols-[repeat(auto-fill,minmax(200px,max-content))] gap-4">
          {visibleCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              isFavorite={favoriteCharacterIds.includes(character.id)}
              onFavoriteToggle={toggleFavoriteCharacter}
              className="transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            />
          ))}
        </div>
      )}
    </div>
  );
};
