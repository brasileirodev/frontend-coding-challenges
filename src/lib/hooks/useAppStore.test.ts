import { useAppStore } from "./useAppStore";

describe("useAppStore", () => {
  beforeEach(() => {
    useAppStore.setState({
      preferredHouse: undefined,
      favoriteCharacterIds: [],
    });
  });

  describe("setPreferredHouse", () => {
    it("sets a specific house", () => {
      useAppStore.getState().setPreferredHouse("Gryffindor");
      expect(useAppStore.getState().preferredHouse).toBe("Gryffindor");
    });

    it("sets null to show all characters", () => {
      useAppStore.getState().setPreferredHouse(null);
      expect(useAppStore.getState().preferredHouse).toBeNull();
    });

    it("sets undefined to trigger house selection", () => {
      useAppStore.getState().setPreferredHouse("Slytherin");
      useAppStore.getState().setPreferredHouse(undefined);
      expect(useAppStore.getState().preferredHouse).toBeUndefined();
    });
  });

  describe("toggleFavoriteCharacter", () => {
    it("adds a character to favorites", () => {
      useAppStore.getState().toggleFavoriteCharacter("character-1");

      expect(useAppStore.getState().favoriteCharacterIds).toEqual(["character-1"]);
      expect(localStorage.getItem("the-harry-potter-app-storage")).toContain("character-1");
    });

    it("removes a character already in favorites", () => {
      useAppStore.setState({ favoriteCharacterIds: ["character-1"] });

      useAppStore.getState().toggleFavoriteCharacter("character-1");

      expect(useAppStore.getState().favoriteCharacterIds).toEqual([]);
    });
  });
});
