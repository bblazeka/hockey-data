import React from "react";
import { render, screen } from "@testing-library/react";

import { mockTeamGame } from "util/mocks";
import { renderWithState } from "util/tests";
import { DEFAULT_LOADING_TEXT } from "util/common";

import TeamSchedule from "./TeamSchedule";

describe("TeamSchedule component", () => {
  it('renders loading without parameters', () => {
    const { container } = render(<TeamSchedule />);
  
    expect(container.textContent).toBe(DEFAULT_LOADING_TEXT);
  });
  it('renders a message when no games', () => {
    render(<TeamSchedule games={[]} />);
  
    const title = screen.getByText("Games");
    const noUpcomingGamesMessage = screen.getByText("No upcoming games.");
    expect(title).toBeInTheDocument();
    expect(noUpcomingGamesMessage).toBeInTheDocument();
  });
  it("renders a game in a list", () => {
    const games = [mockTeamGame()];
    
    renderWithState(
      <TeamSchedule games={games} />
    );

    const title = screen.getByText("Games");
    const listItems = screen.getByRole("listitem");
    expect(title).toBeInTheDocument();
    expect(listItems).toBeInTheDocument();
  });
});
