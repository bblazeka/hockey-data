import React, { useState } from "react";
import { Button, Card, Header } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import { Loader, NotFound, MiniGameCard } from "components";
import { dailyGames as dailyGamesQuery } from "services/querySchemas/game";

const GamesContainer = styled.div`
  padding-bottom: 5vh;
`;

const HeaderStyled = styled(Header)`
  display: flex;
  justify-content: space-between;
`;

dayjs.extend(advancedFormat);
const DATE_ISO_FORMAT = "YYYY-MM-DD";

export default function GameCards() {
  const [date, setDate] = useState(dayjs().format(DATE_ISO_FORMAT));
  const { loading: loadingGames, data } = useQuery(dailyGamesQuery, {
    variables: { dateISO: date },
  });

  const deduceDate = () => {
    setDate(dayjs(date).subtract(1, "day").format(DATE_ISO_FORMAT));
  };

  const increaseDate = () => {
    setDate(dayjs(date).add(1, "day").format(DATE_ISO_FORMAT));
  };

  if (loadingGames) {
    return <Loader></Loader>;
  }
  const { dailyGames } = data;
  return (
    <GamesContainer>
      <HeaderStyled as="h2">
        <Button basic onClick={deduceDate}>
          Previous day
        </Button>
        {dayjs(date).format("MMMM Do YYYY")}
        <Button basic onClick={increaseDate}>
          Next day
        </Button>
      </HeaderStyled>

      {(!dailyGames || dailyGames.length === 0) && (
        <NotFound text="No games found." />
      )}
      <Card.Group centered>
        {dailyGames.map((game) => {
          return <MiniGameCard key={`gamecard${game.gamePk}`} game={game} />;
        })}
      </Card.Group>
    </GamesContainer>
  );
}
