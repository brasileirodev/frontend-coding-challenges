import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("is exposed as a loading status", () => {
    render(<Spinner />);

    expect(screen.getByRole("status", { name: "Loading" })).toHaveClass("opacity-100");
  });

  it("supports hidden and delayed states", () => {
    const { rerender } = render(<Spinner show={false} />);
    expect(screen.getByRole("status")).toHaveClass("opacity-0");

    rerender(<Spinner wait="delay-500" />);
    expect(screen.getByRole("status")).toHaveClass("delay-500");
  });
});
