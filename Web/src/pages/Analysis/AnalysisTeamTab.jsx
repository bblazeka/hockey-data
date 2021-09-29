import React from "react";
import PropTypes from "prop-types";
import { Tab, Header } from "semantic-ui-react";

import { getLogo } from "util/assets";

import TeamStats from "./TeamStats";
import PlayerStats from "./PlayerStats";

export default function AnalysisTeamTab({ category, team, setCategory }) {
  const renderTeamPane = () => (
    <Tab.Pane>
      <TeamStats team={team} category={category} setCategory={setCategory} />
    </Tab.Pane>
  );

  const renderPlayerPane = () => (
    <Tab.Pane>
      <PlayerStats team={team} />
    </Tab.Pane>
  );

  const panes = [
    { menuItem: "Team overall", render: renderTeamPane },
    { menuItem: "Individual stats", render: renderPlayerPane },
  ];

  return (
    <>
      <Header as="h1" className="team-header">
        <img
          className="mid-logo"
          src={getLogo(team.id)}
          alt={`img${team.id}${team.team.name}`}
        />
        {team.team.name}
      </Header>
      <Tab panes={panes} />
    </>
  );
}

AnalysisTeamTab.propTypes = {
  player: PropTypes.object,
};
