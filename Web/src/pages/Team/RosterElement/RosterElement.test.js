import React from "react";
import { render, screen } from "@testing-library/react";

import { mockPlayers } from "util/mocks";
import { renderWithState } from "util/tests";

import RosterElement from "./RosterElement";
import { DEFAULT_LOADING_TEXT } from "util/common";

describe("RosterElement component", () => {
  it('renders loading without parameters', () => {
    const { container } = render(<RosterElement />);
  
    expect(container.textContent).toBe(DEFAULT_LOADING_TEXT);
  });
  it("renders a roster", () => {
    const title = "Title";

    renderWithState(
      <RosterElement title={title} players={mockPlayers(8)} filterPlayers />
    );

    const mainText = screen.getByText(title);
    expect(mainText).toBeInTheDocument();
  });
});
