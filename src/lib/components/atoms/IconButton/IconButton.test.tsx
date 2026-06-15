import { render, screen } from "@testing-library/react";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("exposes an accessible label and optional pressed state", () => {
    render(
      <IconButton label="Toggle option" pressed>
        <span aria-hidden="true">icon</span>
      </IconButton>
    );

    expect(screen.getByRole("button", { name: "Toggle option" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
