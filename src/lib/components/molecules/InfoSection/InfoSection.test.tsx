import { render, screen } from "@testing-library/react";
import { InfoSection } from "./InfoSection";

describe("InfoSection", () => {
  it("composes its heading, grid, items, and divider", () => {
    render(
      <InfoSection title="Information" icon={<span aria-hidden="true">icon</span>}>
        <InfoSection.Grid>
          <InfoSection.Item label="Label" value="Value" />
        </InfoSection.Grid>
        <InfoSection.Divider />
      </InfoSection>
    );

    expect(screen.getByRole("heading", { name: "Information", level: 3 })).toBeInTheDocument();
    expect(screen.getByText("Label").parentElement).toHaveClass("gap-2");
    expect(screen.getByText("Value")).toBeInTheDocument();
  });

  it("supports values without a label", () => {
    render(
      <InfoSection title="Information" icon={<span aria-hidden="true">icon</span>}>
        <InfoSection.Item value="Standalone value" />
      </InfoSection>
    );

    expect(screen.getByText("Standalone value")).toBeInTheDocument();
  });
});
