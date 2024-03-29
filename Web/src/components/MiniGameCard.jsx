import React from "react";
import { Card } from "semantic-ui-react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Loader } from "components";
import { getLogo } from "util/assets";

const MiniGameContainer = styled(Card)`
  width: 10vw !important;
  flex-direction: row !important;
  justify-content: center;
`;

const GameStatus = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const GameScore = styled.div`
  font-size: 1.25em;
  font-weight: bold;
`;

const GameInfo = styled.div`
  font-size: 0.75em;
`;

const GameTeamLogo = styled.img`
  max-height: 6vh;
  max-width: 6vw;
`;

export default function MiniGameCard({ game }) {
  if (!game) {
    return <Loader />;
  }
  const { home, away } = game.teams;
  const gameScore = game.ongoingGame ? `${home.goals}:${away.goals}` : "-:-";
  const generalGameInfo = game.ongoingGame
    ? `${game.currentPeriodOrdinal} ${game.currentPeriodTimeRemaining}`
    : game.gameTime;
  return (
    <MiniGameContainer
      key={game.gamePk}
      target="_blank" rel="noopener noreferrer"
      href={`https://www.nhl.com/gamecenter/${game.gamePk}`}
      color={game.ongoingGame ? (game.finished ? "grey" : "orange") : null}
    >
      <GameTeamLogo
        src={getLogo(home.team.id)}
        title={home.team.name}
        alt={`game-img${home.team.id}`}
      />
      <GameStatus>
        <GameScore>{gameScore}</GameScore>
        <GameInfo>{generalGameInfo}</GameInfo>
      </GameStatus>
      <GameTeamLogo
        src={getLogo(away.team.id)}
        title={away.team.name}
        alt={`game-img${away.team.id}`}
      />
    </MiniGameContainer>
  );
}

MiniGameCard.propTypes = {
  game: PropTypes.object,
};
