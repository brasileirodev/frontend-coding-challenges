import { render, screen } from "@testing-library/react";
import { FeedbackState } from "./FeedbackState";

describe("FeedbackState", () => {
  it("renders inline feedback with optional actions", () => {
    render(
      <FeedbackState
        title="No results"
        description="Change the filters."
        actions={<button type="button">Reset</button>}
      />
    );

    expect(screen.getByText("No results")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  it("uses a heading for page feedback", () => {
    render(<FeedbackState variant="page" title="Page error" />);

    expect(screen.getByRole("heading", { name: "Page error", level: 2 })).toBeInTheDocument();
  });
});
