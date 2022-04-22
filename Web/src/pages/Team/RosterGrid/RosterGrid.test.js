import React from "react";
import { render, screen } from "@testing-library/react";

import { mockPlayers } from "util/mocks";
import { renderWithState } from "util/tests";
import { DEFAULT_LOADING_TEXT } from "util/common";

import RosterGrid from "./RosterGrid";

describe("RosterGrid component", () => {
  it('renders loading without parameters', () => {
    const { container } = render(<RosterGrid />);
  
    expect(container.textContent).toBe(DEFAULT_LOADING_TEXT);
  });
  it("renders a roster", () => {
    const team = {
      goalies: mockPlayers(4),
      defenders: mockPlayers(4),
      forwards: mockPlayers(4)
    };
    
    renderWithState(
      <RosterGrid team={team} filterPlayers={false} />
    );

    const goaliesText = screen.getByText("Goalies");
    const defendersText = screen.getByText("Defenders");
    const forwardsText = screen.getByText("Forwards");
    expect(goaliesText).toBeInTheDocument();
    expect(defendersText).toBeInTheDocument();
    expect(forwardsText).toBeInTheDocument();
  });
});
