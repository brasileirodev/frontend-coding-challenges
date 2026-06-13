import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HouseType } from "@lib/constants/houses";

interface AppState {
  preferredHouse: HouseType | null | undefined;
  favoriteCharacterIds: string[];
  setPreferredHouse: (house: HouseType | null | undefined) => void;
  toggleFavoriteCharacter: (characterId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      preferredHouse: undefined,
      favoriteCharacterIds: [],
      setPreferredHouse: (preferredHouse) => set(() => ({ preferredHouse })),
      toggleFavoriteCharacter: (characterId) =>
        set((state) => ({
          favoriteCharacterIds: state.favoriteCharacterIds.includes(characterId)
            ? state.favoriteCharacterIds.filter((id) => id !== characterId)
            : [...state.favoriteCharacterIds, characterId],
        })),
    }),
    {
      name: "the-harry-potter-app-storage",
    }
  )
);
