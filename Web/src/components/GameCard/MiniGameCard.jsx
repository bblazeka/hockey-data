import React from "react";
import { Card } from "semantic-ui-react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Loader } from "components";
import { getLogo } from "util/assets";
import { IsNullOrUndefined } from "util/common";
import routes from "routes";

const MiniGameContainer = styled(Card)`
  width: 10vw !important;
  flex-direction: row !important;
  justify-content: center;
`;

const GameStatus = styled.span`
  text-align: center;
  padding: 2px 5px;
`;

const GameScore = styled.div`
  font-size: 1.25em;
  font-weight: bold;
`;

const GameInfo = styled.div`
  font-size: 0.75em;
`;

const GameTeamLogo = styled.img`
  max-height: 40px;
  max-width: 40px;
`;

export default function MiniGameCard(props) {
  const { game } = props;
  if (IsNullOrUndefined(game)) {
    return <Loader></Loader>;
  }
  const { home, away } = game.teams;
  const generalGameInfo = game.ongoingGame
    ? `${game.currentPeriodOrdinal} ${game.currentPeriodTimeRemaining}`
    : game.gameTime;
  return (
    <MiniGameContainer
      key={game.gamePk}
      href={`${routes.game}/${game.gamePk}`}
      color={game.ongoingGame ? (game.finished ? "grey" : "orange") : null}
    >
      <GameTeamLogo
        src={getLogo(home.team.id)}
        title={home.team.name}
        alt={`game-img${home.team.id}`}
      />
      <GameStatus>
        <GameScore>
          {home.goals}:{away.goals}
        </GameScore>
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
