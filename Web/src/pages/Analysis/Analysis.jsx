import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Menu, Segment, Tab } from "semantic-ui-react";

import "./Analysis.scss";
import { getLogo } from "util/assets";
import { IsNullOrUndefined } from "util/common";
import { Loader } from "components";
import * as actions from "services/analysis";
import AnalysisTeamTab from "./AnalysisTeamTab";
import { selectAnalysisObject } from "services/selectors";

export default function Analysis() {
  const [category, setCategory] = useState("points");
  const { analysis } = useSelector(selectAnalysisObject);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getAnalysis());
  }, [dispatch]);
  if (IsNullOrUndefined(analysis)) {
    return <Loader />;
  }
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
