import { useState } from "react";
import { Button, FeedbackState, Spinner } from "@lib/components";
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
      <FeedbackState
        title="Something went wrong while fetching characters."
        description="Please try again later."
        className="gap-4"
      />
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="mx-auto flex h-10 w-[474px] max-w-full items-center overflow-x-auto rounded-xl bg-[#211513] p-1">
        <Button
          type="button"
          active={filter === null}
          onClick={() => setFilter(null)}
          className="font-filter h-8 justify-center gap-1 px-4 py-2 text-base leading-4 font-medium"
        >
          All Characters
        </Button>
        {characterFilters.map((characterFilter) => (
          <Button
            key={characterFilter}
            type="button"
            active={filter === characterFilter}
            onClick={() => setFilter(characterFilter)}
            className="font-filter h-8 justify-center gap-1 px-4 py-2 text-base leading-4 font-medium"
          >
            {filterLabels[characterFilter]}
          </Button>
        ))}
      </div>

      {visibleCharacters.length === 0 ? (
        <FeedbackState title="No characters found." description="Try adjusting your filters." />
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
