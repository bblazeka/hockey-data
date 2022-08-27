import React from "react";
import { Header, List, Progress, Segment } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Loader } from "components";

import GameTeamStats from "./GameTeamStats";
import GameHeader from "./GameHeader";
import { useQuery } from "@apollo/client";
import { getGame } from "services/querySchemas/game";

const GameProgress = styled(Progress)`
  margin-top: 10px !important;
`;

export default function Game() {

  const { id } = useParams();

  const { loading, data } = useQuery(getGame, {
    variables: { gameId: parseInt(id) },
  });

  if (loading) {
    return <Loader />;
  }
  const { game } = data;
  return (
    <>
      {game && (
        <Segment>
          <GameHeader game={game} />
          <GameProgress color="blue" percent={game.percentage}>
            {game.linescore.currentPeriodOrdinal}{" "}
            {game.linescore.currentPeriodTimeRemaining}
          </GameProgress>
        </Segment>
      )}
      {game && (
        <>
          <GameTeamStats team={game.teams.home} />
          <GameTeamStats team={game.teams.away} />
        </>
      )}
      {game && (
        <Segment>
          <List horizontal>
            <List.Item>
              <Header as="h5">Game officials:</Header>
            </List.Item>
            {game.officials &&
              game.officials.map((official, index) => {
                return (
                  <List.Item key={`${official.official.id}${index}`}>
                    <List.Icon name="user" />
                    <List.Content>
                      <List.Header>{official.official.fullName}</List.Header>
                      {official.officialType}
                    </List.Content>
                  </List.Item>
                );
              })}
          </List>
        </Segment>
      )}
    </>
  );
}
