import React, { useState } from "react";
import { Tab, Header, Image } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { getLogo } from "util/assets";
import { Loader } from "components";
import { getTeamAnalysis } from "services/querySchemas/analysis";
import routes from "routes";
import { MidLogo } from "components/collection";
import { getTeams } from "services/querySchemas/team";

import TeamStats from "./TeamStats";
import EnhancedStatsTable from "./EnhancedStatsTable";
import RosterStatsGrid from "./RosterStatsGrid";


const QuickJumpContainer = styled.div`
  text-align: center;
`;

export default function TeamAnalysis() {
  const [category, setCategory] = useState("points");
  let { id } = useParams();
  const { data: getTeamsData } = useQuery(getTeams);
  const { teams } = getTeamsData ?? { teams: []};

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

  const panes = [
    { menuItem: "Team overall", render: renderTeamPane },
    { menuItem: "Team stats", render: renderStatsPane },
    { menuItem: "Advanced stats", render: renderAdvancedStatsPane },
  ];

  return (
    <>
      <QuickJumpContainer>
        {linkOptions.map((opt) => (
          <Image
            key={opt.id}
            avatar
            src={getLogo(opt.id)}
            href={opt.href}
            title={opt.name}
          />
        ))}
      </QuickJumpContainer>
      <Header as="h1">
        <MidLogo
          src={getLogo(teamAnalysis.id)}
          alt={`img${teamAnalysis.id}${teamAnalysis.team.name}`}
        />
        {teamAnalysis.team.name}
      </Header>
      <Tab panes={panes} />
    </>
  );
}
