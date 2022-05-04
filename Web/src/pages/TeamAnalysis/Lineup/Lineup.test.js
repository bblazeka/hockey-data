import React from "react";
import { screen } from "@testing-library/react";

import { mockLineupPlayer } from "util/mocks";
import { renderWithState } from "util/tests";

import Lineup from "./Lineup";

describe("Lineup component", () => {
  it("renders loading", () => {
    renderWithState(<Lineup />);

    const mainText = screen.getByText("Loading lines...");
    expect(mainText).toBeInTheDocument();
  });
  it("renders not found", () => {
    renderWithState(<Lineup lines={{}} />);

    const mainText = screen.getByText("Lines not found.");
    expect(mainText).toBeInTheDocument();
  });
  it("renders a lineup", () => {
    const lines = {
      lines: [
        {
          leftWing: mockLineupPlayer(),
          center: mockLineupPlayer(),
          rightWing: mockLineupPlayer(),
        },
      ],
      goalies: { starter: mockLineupPlayer(), backup: mockLineupPlayer() },
    };

    renderWithState(<Lineup lines={lines} />);

    const mainText = screen.getByText(
      `#${lines.goalies.starter.number} ${lines.goalies.starter.name}`
    );
    expect(mainText).toBeInTheDocument();
  });
});
