import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import routes from '../../routes';
import './RosterGrid.css';
import RosterElement from '../RosterElement/RosterElement';

function RosterGrid(props) {
  const { team } = props;
  console.log(team)
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