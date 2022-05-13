import React from "react";
import { Card } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { GameCard, Loader, NotFound } from "components";
import { selectGameList } from "reducers/selectors";

export default function GameList() {
  const { gamesBetweenTeams, loading, loadingTeams } =
    useSelector(selectGameList);
  if (!(gamesBetweenTeams)) {
    return <NotFound text="No games found." />;
  }
  if (loading || loadingTeams) {
    return <Loader />;
  }
  return (
    <Card.Group centered>
      {gamesBetweenTeams.games.map((game) => (
        <GameCard key={game.gamePk} game={game} />
      ))}
    </Card.Group>
  );
}
