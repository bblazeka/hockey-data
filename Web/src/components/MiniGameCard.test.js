import { render, screen } from "@testing-library/react";
import React from "react";
import { DEFAULT_LOADING_TEXT } from "util/common";
import { mockGame } from "util/mocks";

import MiniGameCard from "./MiniGameCard";

describe("MiniGameCard component", () => {
  let baseGame = mockGame();

  it("renders loading when no parameter", () => {
    const { container } = render(<MiniGameCard />);

    expect(container.textContent).toBe(DEFAULT_LOADING_TEXT);
  });

  it("renders scheduled game", () => {
    const game = {
      ...baseGame,
      ongoingGame: false,
      status: {
        abstractGameState: "Preview",
        detailedState: "Scheduled",
        statusCode: "1",
      },
      finished: false,
    };

    render(<MiniGameCard game={game} />);

    const resultContainer = screen.getByText("-:-");
    expect(resultContainer).toBeInTheDocument();
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

    const { container } = render(<MiniGameCard game={game} />);

    expect(container.textContent).toContain(finalLabel);
  });
});
