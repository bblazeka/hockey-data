import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, List, Progress, Segment } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getGame } from "reducers/gameActions";
import { selectGameData } from "reducers/selectors";
import { Loader } from "components";

import GameTeamStats from "./GameTeamStats/GameTeamStats";
import GameHeader from "./GameHeader";

const GameProgress = styled(Progress)`
  margin-top: 10px !important;
`;

export default function Game() {
  const { game, loading } = useSelector(selectGameData);

  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGame(id));
  }, [id]);

  if (loading) {
    return <Loader></Loader>;
  }
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
