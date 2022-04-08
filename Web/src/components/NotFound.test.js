import { render } from "@testing-library/react";
import React from "react";
import NotFound from "./NotFound";

describe("NotFound component", () => {
  it("renders not found without text parameter", () => {
    const { container } = render(<NotFound />);

    expect(container.textContent).toBe("Not found.");
  });

  it("renders text given as parameter", () => {
    const testingText = "Testing text";

    const { container } = render(<NotFound text={testingText} />);

    expect(container.textContent).toBe(testingText);
  });
});
