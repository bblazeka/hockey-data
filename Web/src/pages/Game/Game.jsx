import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, List, Progress, Segment } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import * as actions from "services/game";
import { selectGameData } from "services/selectors";
import { Loader } from "components";

import GameTeamStats from "./GameTeamStats/GameTeamStats";
import "./Game.scss";
import GameHeader from "./GameHeader";

export default function Game() {
  const { game, loading } = useSelector(selectGameData);

  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getGame(id));
  }, [id]);

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <>
      {game && (
        <Segment>
          <GameHeader game={game} />
          <Progress
            className="game-progress"
            color="blue"
            percent={game.percentage}
          >
            {game.linescore.currentPeriodOrdinal}{" "}
            {game.linescore.currentPeriodTimeRemaining}
          </Progress>
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
                  <List.Item key={official.official.id + "" + index}>
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
