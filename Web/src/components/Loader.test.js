import { render } from "@testing-library/react";
import React from "react";
import { DEFAULT_LOADING_TEXT } from "util/common";
import Loader from "./Loader";

describe("Loader component", () => {
  it("renders loading without parameters", () => {
    const { container } = render(<Loader />);

    expect(container.textContent).toBe(DEFAULT_LOADING_TEXT);
  });

  it("renders text given as parameter", () => {
    const testingText = "Testing text";

    const { container } = render(<Loader text={testingText} />);

    expect(container.textContent).toBe(testingText);
  });
});
