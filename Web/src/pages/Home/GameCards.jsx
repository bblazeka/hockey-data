import React from "react";
import { Card } from "semantic-ui-react";
import { useQuery } from "@apollo/client";

import { GameCard, Loader, NotFound } from "components";
import { IsNullOrUndefined } from "util/common";
import { getTodaysGames } from "services/game/querySchemas";

export default function GameCards() {
  const { loading: loadingGames, data } = useQuery(getTodaysGames);

  if (loadingGames) {
    return <Loader></Loader>;
  }
  const { todaysGames: games } = data;
  return (
    <>
      {(IsNullOrUndefined(games) || games.length === 0) && (
        <NotFound text="No games found." />
      )}
      <Card.Group>
        {games.map((game) => {
          return <GameCard key={`gamecard${game.gamePk}`} game={game} />;
        })}
      </Card.Group>
    </>
  );
}
