import React from "react";
import { Card, Divider, Header, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import styled from "styled-components";
import dayjs from "dayjs";

import { Loader } from "components";
import { getLogo } from "util/assets";
import routes from "routes";

const GameTeamLogo = styled.img`
  max-height: 40px;
  max-width: 40px;
`;

const GameInfoContainer = styled.div`
  padding-top: 2vh;
  display: flex;
  justify-content: space-between;
`;

const TeamGoalsNumber = styled.div`
  font-size: 2em;
  font-weight: 600;
  float: right;
  margin-top: 1vh;
`;

const GameTeamStyled = styled.div`
  display: inline-flex !important;
`;

export default function GameCard({ game }) {
  if (!game) {
    return <Loader />;
  }
  const { home, away, season, status } = game;
  const finished = status?.statusCode === "7";

  return (
    <Card
      key={game.gamePk}
      href={`${routes.game}/${game.gamePk}`}
      color={finished ? "grey" : null}
    >
      <Card.Content>
        <GameTeamStyled>
          <Header as="h3">
            <GameTeamLogo
              src={getLogo(home.team.id)}
              alt={`game-img${home.team.id}`}
            />
            <Header.Content>
              {home.team.name}
              <Header.Subheader>
                {home.leagueRecord.wins}-{home.leagueRecord.losses}-
                {home.leagueRecord.ot}
              </Header.Subheader>
            </Header.Content>
          </Header>
        </GameTeamStyled>
        <TeamGoalsNumber>{home.score}</TeamGoalsNumber>
        <Divider horizontal>{status.detailedState}</Divider>
        <GameTeamStyled>
          <Header as="h3">
            <GameTeamLogo
              src={getLogo(away.team.id)}
              alt={`game-img${away.team.id}`}
            />
            <Header.Content>
              {away.team.name}
              <Header.Subheader>
                {away.leagueRecord.wins}-{away.leagueRecord.losses}-
                {away.leagueRecord.ot}
              </Header.Subheader>
            </Header.Content>
          </Header>
        </GameTeamStyled>
        <TeamGoalsNumber>{away.score}</TeamGoalsNumber>
        <GameInfoContainer>
          <span>
            <Icon name="trophy" />
            {season}
          </span>
          <span>
            <Icon name="calendar" />
            {dayjs(game.gameDate).format("DD.MM.YYYY")}
          </span>
        </GameInfoContainer>
      </Card.Content>
    </Card>
  );
}

GameCard.propTypes = {
  game: PropTypes.object,
};
