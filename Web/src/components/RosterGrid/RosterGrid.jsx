import React from 'react';

import './RosterGrid.scss';
import RosterElement from '../RosterElement/RosterElement';
import { IsNullOrUndefined } from '../../util/common';
import { Loader } from '..';

function RosterGrid(props) {
  const { filterPlayers, team } = props;
  if (IsNullOrUndefined(team)) {
    return (<Loader></Loader>);
  }
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