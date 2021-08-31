import React from "react";
import { Button, Image, List } from "semantic-ui-react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import routes from "routes";
import { NotFound } from "components";
import { GetCompetitionStageFullName } from "util/common";
import { getLogo } from "util/assets";
import { IsNullOrUndefined } from "util/common";

export default function GameList(props) {
  const { gamesBetweenTeams } = props;
  if (IsNullOrUndefined(gamesBetweenTeams)) {
    return <NotFound text="No games found." />;
  }
  return (
    <List>
      {gamesBetweenTeams &&
        gamesBetweenTeams.games.map((game) => {
          return (
            <List.Item key={game.gamePk}>
              <List.Content floated="right">
                <Link to={`${routes.game}/${game.gamePk}`}>
                  <Button>Open</Button>
                </Link>
              </List.Content>
              <List.Content>
                <List horizontal>
                  <List.Item>
                    <Image className="tiny-logo" src="/favicon.ico" />
                    <List.Content>
                      <List.Header>{game.season}</List.Header>
                      {GetCompetitionStageFullName(game.gameType)}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <Image avatar src={getLogo(game.home.team.id)} />
                    <List.Content>
                      <List.Header>{game.home.team.name}</List.Header>
                      {game.home.leagueRecord.wins}-
                      {game.home.leagueRecord.losses}-
                      {game.home.leagueRecord.ot}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    {game.home.score}:{game.away.score}
                  </List.Item>
                  <List.Item>
                    <Image avatar src={getLogo(game.away.team.id)} />
                    <List.Content>
                      <List.Header>{game.away.team.name}</List.Header>
                      {game.away.leagueRecord.wins}-
                      {game.away.leagueRecord.losses}-
                      {game.away.leagueRecord.ot}
                    </List.Content>
                  </List.Item>
                  <List.Item>{dayjs(game.gameDate).toString()}</List.Item>
                </List>
              </List.Content>
            </List.Item>
          );
        })}
    </List>
  );
}

GameList.propTypes = {
  gamesBetweenTeams: PropTypes.object,
};
