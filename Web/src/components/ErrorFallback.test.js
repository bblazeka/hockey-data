import { render, screen } from "@testing-library/react";
import React from "react";
import ErrorFallback from "./ErrorFallback";

describe("ErrorFallback component", () => {
  it("renders error given as parameter", () => {
    const testErrorMessage = "This is a funny error";
    render(<ErrorFallback error={{ message: testErrorMessage }} />);

    const defaultErrorText = screen.getByText(/Oops, there was an error/i);
    const testErrorText = screen.getByText(testErrorMessage);
    expect(defaultErrorText).toBeInTheDocument();
    expect(testErrorText).toBeInTheDocument();
  });
});
