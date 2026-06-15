import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CharacterDetails } from "./CharacterDetails";
import { mockCharacter } from "../../../test/mocks";
import { useAppStore } from "@lib/hooks/useAppStore";

describe("CharacterDetails", () => {
  beforeEach(() => {
    useAppStore.setState({ favoriteCharacterIds: [] });
  });

  it("renders the required information sections", () => {
    render(<CharacterDetails character={mockCharacter} />);

    expect(screen.getByRole("heading", { name: "Harry Potter" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /basic information/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /magical information/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /hogwarts/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /portrayed by/i })).toBeInTheDocument();
    expect(screen.getByText("July 31, 1980")).toBeInTheDocument();
    expect(screen.getByText("Daniel Radcliffe")).toBeInTheDocument();
    expect(screen.getByText(/The Boy Who Lived, The Chosen One/)).toBeInTheDocument();
  });

  it("renders fallbacks for unavailable text values", () => {
    render(
      <CharacterDetails
        character={{ ...mockCharacter, dateOfBirth: undefined, patronus: "", alternate_names: [] }}
      />
    );

    expect(screen.getAllByText("Not available")).toHaveLength(2);
    expect(screen.queryByText(/Also known as:/)).not.toBeInTheDocument();
  });

  it("toggles the character favorite state", async () => {
    const user = userEvent.setup();
    render(<CharacterDetails character={mockCharacter} />);

    const favoriteButton = screen.getByRole("button", {
      name: "Add Harry Potter to favorites",
    });

    await user.click(favoriteButton);

    expect(favoriteButton).toHaveAttribute("aria-pressed", "true");
    expect(favoriteButton).toHaveAccessibleName("Remove Harry Potter from favorites");
    expect(useAppStore.getState().favoriteCharacterIds).toEqual([mockCharacter.id]);
    expect(localStorage.getItem("the-harry-potter-app-storage")).toContain(mockCharacter.id);
  });
});
