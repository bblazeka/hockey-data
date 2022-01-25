import React, { useState } from "react";
import { Image, Menu, Segment, Tab } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { getLogo } from "util/assets";
import { Loader } from "components";
import { getAnalysis } from "services/analysis/querySchemas";

import AnalysisTeamTab from "./AnalysisTeamTab";

const StyledPosition = styled.h1`
  text-align: center;
`;

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
          <StyledPosition>
            {index + 1}. <Image avatar src={getLogo(team.id)}></Image>
          </StyledPosition>
        </Menu.Item>
      ),
      render: () => renderTabPane(team),
    };
  });
  return (
    <Segment>
      <Tab
        grid={{ paneWidth: 14, tabWidth: 2 }}
        menu={{ fluid: true, vertical: true }}
        menuPosition="left"
        panes={panes}
      />
    </Segment>
  );
}
