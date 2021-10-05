import React from "react";
import { Header, List, Image, Segment } from "semantic-ui-react";
import styled from "styled-components";

import { NotFound, Loader } from "components";
import { getLogo } from "util/assets";
import { IsNullOrUndefined } from "util/common";

const TeamGameDateStyled = styled.div`
  font-size: 10px;
  font-style: italic;
  color: gray;
`;

function TeamSchedule(props) {
  const { games } = props;
  if (IsNullOrUndefined(games)) {
    return <Loader text="Loading team schedule..."></Loader>;
  }
  return (
    <>
      <Segment>
        <Header as="h3">Games</Header>
        {games.length === 0 && <NotFound text="No upcoming games." />}
        <List horizontal>
          {games.map((game) => {
            return (
              <List.Item key={game.gamePk}>
                <Image avatar src={getLogo(game.opponent.team.id)} />
                <List.Content>
                  <TeamGameDateStyled>{game.date}</TeamGameDateStyled>
                  <List.Header>{game.opponent.team.name}</List.Header>
                  <List.Description>
                    {game.opponent.leagueRecord.wins}-
                    {game.opponent.leagueRecord.losses}-
                    {game.opponent.leagueRecord.ot}
                  </List.Description>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </Segment>
    </>
  );
}

export default React.memo(TeamSchedule);
