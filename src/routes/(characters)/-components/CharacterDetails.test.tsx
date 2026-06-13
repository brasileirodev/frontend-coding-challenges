import { render, screen } from "@testing-library/react";
import { CharacterDetails } from "./CharacterDetails";
import { mockCharacter } from "../../../test/mocks";

describe("CharacterDetails", () => {
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
});
