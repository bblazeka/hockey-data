import React from 'react';
import './RosterGrid.css';
import RosterElement from '../RosterElement/RosterElement';

function RosterGrid(props) {
  const { team } = props;
  return (
    <div>
      <div className="roster">
        <RosterElement title={"Goalies"} players={team.goalies}/>
        <RosterElement title={"Defenders"} players={team.defenders}/>
        <RosterElement title={"Forwards"} players={team.forwards}/>
      </div>
    </div>
  );

}

export default RosterGrid;