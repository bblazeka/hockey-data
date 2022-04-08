import { render, screen } from "@testing-library/react";
import React from "react";
import QuestionModal from "./QuestionModal";

describe("QuestionModal component", () => {
  it("does not render without open prop", () => {
    const { container } = render(<QuestionModal />);

    expect(container.textContent).toBe("");
  });

  it("renders modal when open is true", () => {
    render(<QuestionModal open={true} />);

    const mainText = screen.getByText(/Are you sure/i);
    expect(mainText).toBeInTheDocument();
  });
});
