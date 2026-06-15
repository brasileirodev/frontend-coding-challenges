import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("forwards native button behavior", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);

    await userEvent.click(screen.getByRole("button", { name: "Click" }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies the selected state before the visual variant", () => {
    render(
      <Button active variant="ghost">
        Active
      </Button>
    );

    expect(screen.getByRole("button")).toHaveClass("bg-yellow-600/60");
  });

  it("supports visual variants and custom classes", () => {
    render(
      <Button variant="primary" className="custom-class">
        Primary
      </Button>
    );

    expect(screen.getByRole("button")).toHaveClass("bg-yellow-600/60", "custom-class");
  });
});
