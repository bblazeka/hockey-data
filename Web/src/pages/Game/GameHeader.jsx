import React from "react";
import { Grid, Image, List, Statistic } from "semantic-ui-react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Loader } from "components";
import { DateToServerFormat, GetCompetitionStageFullName } from "util/common";
import { getLogo } from "util/assets";

const MainImage = styled(Image)`
  max-width: 4rem !important;
  max-height: 4rem !important;
`;

export default function GameHeader({ game }) {
  if (!game) {
    return <Loader />;
  }
  return (
    <Grid stackable>
      <Grid.Column floated="left" width={6}>
        <Statistic.Group>
          <Statistic>
            <Statistic.Value>
              <MainImage avatar src={getLogo(game.teams.home.team.id)} />
            </Statistic.Value>
            <Statistic.Label>{game.teams.home.team.name}</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              {`${game.linescore.teams.home.goals}:${game.linescore.teams.away.goals}`}
            </Statistic.Value>
            <Statistic.Label>
              {game.linescore.teams.home.shotsOnGoal} SOG{" "}
              {game.linescore.teams.away.shotsOnGoal}
            </Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              <MainImage avatar src={getLogo(game.teams.away.team.id)} />
            </Statistic.Value>
            <Statistic.Label>{game.teams.away.team.name}</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Grid.Column>
      <Grid.Column floated="right" width={3}>
        <List>
          <List.Item>
            <List.Icon name="trophy" />
            <List.Content>
              {GetCompetitionStageFullName(game.gameType)} {game.season}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="calendar outline" />
            <List.Content>
              {dayjs(DateToServerFormat(game.gameDate)).format("DD.MM.YYYY")}
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="clock outline" />
            <List.Content>{dayjs(game.gameDate).format("HH:mm")}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="marker" />
            <List.Content>{game.venue.name}</List.Content>
          </List.Item>
        </List>
      </Grid.Column>
      <Grid.Column floated="right" width={5}>
        <List horizontal>
          <List.Item>
            <Image
              verticalAlign="bottom"
              avatar
              src={getLogo(game.teams.home.team.id)}
            />
          </List.Item>
          <List.Item>
            <List.Content verticalAlign="top">
              <List.Header>G</List.Header>
              SOG
            </List.Content>
          </List.Item>
          {game.linescore.periods &&
            game.linescore.periods.map((period) => {
              return (
                <List.Item key={`${period.num}${period.home}`}>
                  <List.Content verticalAlign="bottom">
                    <List.Header>{period.home.goals}</List.Header>
                    {period.home.shotsOnGoal}
                  </List.Content>
                </List.Item>
              );
            })}
        </List>
        <br />
        <List horizontal>
          <List.Item>
            <Image
              verticalAlign="bottom"
              avatar
              src={getLogo(game.teams.away.team.id)}
            />
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>G</List.Header>
              SOG
            </List.Content>
          </List.Item>
          {game.linescore.periods &&
            game.linescore.periods.map((period) => {
              return (
                <List.Item key={`${period.num}${period.away}`}>
                  <List.Content>
                    <List.Header>{period.away.goals}</List.Header>
                    {period.away.shotsOnGoal}
                  </List.Content>
                </List.Item>
              );
            })}
        </List>
      </Grid.Column>
    </Grid>
  );
}

GameHeader.propTypes = {
  game: PropTypes.object,
};
