import { render, screen } from "@testing-library/react";
import { DecorativeIcon } from "./DecorativeIcon";

describe("DecorativeIcon", () => {
  it("remains hidden from the accessibility tree", () => {
    render(<DecorativeIcon src="/icon.svg" data-testid="decorative-icon" />);

    const icon = screen.getByTestId("decorative-icon");
    expect(icon).toHaveAttribute("alt", "");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});
