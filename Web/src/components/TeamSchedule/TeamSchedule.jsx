import React from 'react';
import { Header, List, Image, Segment } from 'semantic-ui-react';

import './TeamSchedule.scss';
import { NotFound, Loader } from '..';
import { getLogo } from '../../util/assets';
import { IsNullOrUndefined } from '../../util/common';

export default function TeamSchedule(props) {
  const { games } = props;
  if (IsNullOrUndefined(games)) {
    return (<Loader></Loader>);
  }
  return (
    <div>
      <Segment>
        <Header as='h3'>Games</Header>
        {games.length === 0 && <NotFound text={'No upcoming games.'} />}
        <List horizontal>
          {games.map((game) => {
            return (
              <List.Item key={game.gamePk}>
                <Image avatar src={getLogo(game.opponent.team.id)} />
                <List.Content>
                  <div className='team-game-date'>{game.date}</div>
                  <List.Header>{game.opponent.team.name}</List.Header>
                  <List.Description>{game.opponent.leagueRecord.wins}-{game.opponent.leagueRecord.losses}-{game.opponent.leagueRecord.ot}</List.Description>
                </List.Content>
              </List.Item>);
          })}
        </List>
      </Segment>
    </div>);

}