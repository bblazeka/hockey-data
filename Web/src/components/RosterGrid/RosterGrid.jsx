import React from 'react';
import './RosterGrid.scss';
import RosterElement from '../RosterElement/RosterElement';

function RosterGrid(props) {
  const { filterPlayers, team } = props;
  return (
    <div>
      <div className="roster">
        <RosterElement title={'Goalies'} players={team.goalies} filterPlayers={filterPlayers} />
        <RosterElement title={'Defenders'} players={team.defenders} filterPlayers={filterPlayers} />
        <RosterElement title={'Forwards'} players={team.forwards} filterPlayers={filterPlayers} />
      </div>
    </div>
  );

}

export default RosterGrid;