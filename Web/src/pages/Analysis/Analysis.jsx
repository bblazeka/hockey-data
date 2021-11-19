import React, { useState } from "react";
import { Image, Menu, Segment, Tab } from "semantic-ui-react";
import { useQuery } from "@apollo/client";

import { getLogo } from "util/assets";
import { Loader } from "components";
import { getAnalysis } from "services/analysis/querySchemas";

import AnalysisTeamTab from "./AnalysisTeamTab";

export default function Analysis() {
  const [category, setCategory] = useState("points");
  const { loading: loadingAnalysis, data } = useQuery(getAnalysis);
  if (loadingAnalysis) {
    return <Loader />;
  }
  const { analysis } = data;
  const renderTabPane = (team) => {
    return (
      <Tab.Pane>
        <AnalysisTeamTab
          category={category}
          team={team}
          setCategory={setCategory}
        />
      </Tab.Pane>
    );
  };
  const panes = analysis.map((team, index) => {
    return {
      menuItem: (
        <Menu.Item key={team.id}>
          {index + 1}. <Image avatar src={getLogo(team.id)} /> {team.team.name}
        </Menu.Item>
      ),
      render: () => renderTabPane(team),
    };
  });
  return (
    <Segment>
      <Tab
        grid={{ paneWidth: 13, tabWidth: 3 }}
        menu={{ fluid: true, vertical: true }}
        menuPosition="left"
        panes={panes}
      />
    </Segment>
  );
}
