import React from "react";
import PropTypes from "prop-types";
import { Tab, Header } from "semantic-ui-react";

import { getLogo } from "util/assets";

import TeamStats from "./TeamStats";
import EnhancedStatsTable from "./EnhancedStatsTable";
import Lineup from "./Lineup/Lineup";
import RosterStatsGrid from "./RosterStatsGrid/RosterStatsGrid";

export default function AnalysisTeamTab({ category, team, setCategory }) {
  const renderTeamPane = () => (
    <Tab.Pane>
      <TeamStats team={team} category={category} setCategory={setCategory} />
    </Tab.Pane>
  );

  const renderStatsPane = () => {
    return (
      <Tab.Pane>
        <RosterStatsGrid rosterStats={team.skaterStats} title="Skaters" />
        <RosterStatsGrid rosterStats={team.goalieStats} title="Goalies" />
      </Tab.Pane>
    );
  };

  const renderAdvancedStatsPane = () => (
    <Tab.Pane>
      <EnhancedStatsTable
        skaterStats={team.skaterStats}
        goalieStats={team.goalieStats}
      />
    </Tab.Pane>
  );

  const renderInsights = () => (
    <Tab.Pane>
      <div>
        <Lineup lines={team.lines}></Lineup>
      </div>
    </Tab.Pane>
  );

  const panes = [
    { menuItem: "Team overall", render: renderTeamPane },
    { menuItem: "Team stats", render: renderStatsPane },
    { menuItem: "Advanced stats", render: renderAdvancedStatsPane },
    { menuItem: "Insights", render: renderInsights },
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
