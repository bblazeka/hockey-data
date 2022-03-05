import React, { useEffect, useState } from "react";
import { Tab, Header, Image } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { getTeams } from "services/team";
import { getLogo } from "util/assets";
import { Loader } from "components";
import { selectTeamObject } from "services/selectors";
import { getTeamAnalysis } from "services/analysis/querySchemas";
import routes from "routes";

import TeamStats from "./TeamStats";
import EnhancedStatsTable from "./EnhancedStatsTable";
import Lineup from "./Lineup/Lineup";
import RosterStatsGrid from "./RosterStatsGrid/RosterStatsGrid";

const QuickJumpContainer = styled.div`
  text-align: center;
`;

export default function TeamAnalysis() {
  const [category, setCategory] = useState("points");
  let { id } = useParams();
  const dispatch = useDispatch();
  const { teams } = useSelector(selectTeamObject);

  const linkOptions = teams
    ? [
        { id: 0, name: "NHL", href: `${routes.analysis}` },
        ...teams.map((t) => ({
          id: t.id,
          name: t.name,
          href: `${routes.analysis}/${t.id}`,
        })),
      ]
    : [];
  useEffect(() => {
    dispatch(getTeams());
  }, []);
  const { loading: loadingAnalysis, data } = useQuery(getTeamAnalysis, {
    variables: { teamId: parseInt(id) },
  });
  if (loadingAnalysis) {
    return <Loader />;
  }
  const { teamAnalysis } = data;

  const renderTeamPane = () => (
    <Tab.Pane>
      <TeamStats
        team={teamAnalysis}
        category={category}
        setCategory={setCategory}
      />
    </Tab.Pane>
  );

  const renderStatsPane = () => {
    return (
      <Tab.Pane>
        <RosterStatsGrid
          skaterStats={teamAnalysis.skaterStats}
          goalieStats={teamAnalysis.goalieStats}
        />
      </Tab.Pane>
    );
  };

  const renderAdvancedStatsPane = () => (
    <Tab.Pane>
      <EnhancedStatsTable
        skaterStats={teamAnalysis.skaterStats}
        goalieStats={teamAnalysis.goalieStats}
      />
    </Tab.Pane>
  );

  const renderInsights = () => (
    <Tab.Pane>
      <div>
        <Lineup lines={teamAnalysis.lines}></Lineup>
        <span>Last update: {teamAnalysis.lastUpdated}</span>
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
      <QuickJumpContainer>
        {linkOptions.map((opt) => (
          <a key={opt.id}>
            <Image
              avatar
              src={getLogo(opt.id)}
              href={opt.href}
              title={opt.name}
            />
          </a>
        ))}
      </QuickJumpContainer>
      <Header as="h1" className="team-header">
        <img
          className="mid-logo"
          src={getLogo(teamAnalysis.id)}
          alt={`img${teamAnalysis.id}${teamAnalysis.team.name}`}
        />
        {teamAnalysis.team.name}
      </Header>
      <Tab panes={panes} />
    </>
  );
}
