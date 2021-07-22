import React from 'react';
import { Card, Divider, Header } from 'semantic-ui-react';

import './GameCard.scss';
import Loader from '../Loader/Loader';
import routes from '../../routes';
import { getLogo } from '../../util/assets';
import { IsNullOrUndefined } from '../../util/common';

function GameCard(props) {
  const { game } = props;
  if (IsNullOrUndefined(game)) {
    return (<Loader></Loader>);
  }
  const { home, away } = game.teams;
  var generalGameInfo = game.ongoingGame ? `${game.currentPeriodOrdinal} ${game.currentPeriodTimeRemaining}` : game.gameTime;
  return (
    <Card key={game.gamePk} href={`${routes.game}/${game.gamePk}`} color={game.ongoingGame ? game.finished ? 'grey' : 'orange' : null}>
      <Card.Content>
        <Header as='h3' className="game-team-header">
          <img className='game-team-logo' src={getLogo(home.team.id)} alt={`game-img${home.team.id}`} />
          <Header.Content>
            {home.team.name}
            <Header.Subheader>{home.shotsOnGoal} SOG</Header.Subheader>
          </Header.Content>
        </Header>
        <div className="team-goals">{home.goals}</div>
        <Divider horizontal>{generalGameInfo}</Divider>
        <Header as='h3' className="game-team-header game-team-header2">
          <img className='game-team-logo' src={getLogo(away.team.id)} alt={`game-img${away.team.id}`} />
          <Header.Content>
            {away.team.name}
            <Header.Subheader>{away.shotsOnGoal} SOG</Header.Subheader>
          </Header.Content>
        </Header>
        <div className="team-goals">{away.goals}</div>
      </Card.Content>
    </Card>);

}

export default GameCard;