import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FavoriteButton } from "./FavoriteButton";

describe("FavoriteButton", () => {
  it("communicates and triggers the inactive favorite state", async () => {
    const onToggle = vi.fn();
    render(<FavoriteButton subjectName="Character" isFavorite={false} onToggle={onToggle} />);

    const button = screen.getByRole("button", { name: "Add Character to favorites" });
    await userEvent.click(button);

    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it("communicates the active favorite state", () => {
    render(<FavoriteButton subjectName="Character" isFavorite onToggle={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Remove Character from favorites" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
