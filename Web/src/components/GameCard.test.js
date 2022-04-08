import { render } from "@testing-library/react";
import React from "react";
import GameCard from "./GameCard";

describe("GameCard component", () => {
  let baseGame = {
    home: {
      team: { id: 1, name: "Test 1" },
      leagueRecord: { wins: 0, losses: 0, ot: 0 },
      shotsOnGoal: 1,
      goals: 1,
    },
    away: {
      team: { id: 2, name: "Test 2" },
      leagueRecord: { wins: 0, losses: 0, ot: 0 },
      shotsOnGoal: 2,
      goals: 2,
    },
  };

  it("renders loading when no parameter", () => {
    const { container } = render(<GameCard />);

    expect(container.textContent).toBe("Loading...");
  });

  it("renders scheduled game", () => {
    const scheduledLabel = "Scheduled";
    const game = {
      ...baseGame,
      ongoingGame: true,
      status: {
        abstractGameState: "Preview",
        detailedState: "Scheduled",
        statusCode: "1",
      },
      finished: false,
    };

    const { container } = render(<GameCard game={game} />);

    expect(container.textContent).toContain(scheduledLabel);
  });

  it("renders finished game", () => {
    const finalLabel = "Final";

    const game = {
      ...baseGame,
      ongoingGame: true,
      status: {
        abstractGameState: "Final",
        detailedState: "Final",
        statusCode: "7",
      },
      currentPeriodTimeRemaining: finalLabel,
      finished: true,
    };

    const { container } = render(<GameCard game={game} />);

    expect(container.textContent).toContain(finalLabel);
  });
});
