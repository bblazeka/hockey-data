import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Dropdown, Header } from "semantic-ui-react";
import styled from "styled-components";

import routes from "routes";
import SortableTable from "components/SortableTable";
import categories from "util/categories.json";
import config from "util/config.json";

const dropdownOptions = [
  { key: "even", text: "Even strength", value: "even" },
  { key: "pp", text: "Powerplay", value: "pp" },
  { key: "pk", text: "Penaltykill", value: "pk" },
  { key: "shoot", text: "Summary shooting", value: "shoot" },
  { key: "puck", text: "Puck possessions", value: "puck" },
];

const StyledDropdown = styled(Dropdown)`
  margin-bottom: 1vh;
  display: block;
`;

export default function EnhancedStatsTable({ skaterStats, goalieStats }) {
  const [dataType, setDataType] = useState("even");
  const skaterSource = skaterStats.map((p) => {
    return { ...p.advancedStats, link: `${routes.player}/${p.id}` };
  });
  const goalieSource = goalieStats.map((p) => {
    return { ...p.advancedStats, link: `${routes.player}/${p.id}` };
  });
  const specificData = useMemo(() => {
    return config.categoryGroups[dataType].map(category => categories.skaterCategories[category]);
  }, [dataType]);
  return (
    <>
      <Header as="h4">Skaters</Header>
      <StyledDropdown
        header="Data type"
        inline
        onChange={(_event, data) => setDataType(data.value)}
        defaultValue={dropdownOptions[0].value}
        options={dropdownOptions}
      />{" "}
      <SortableTable
        columnNames={[
          {
            title: "Skater",
            property: "skaterFullName",
            link: true,
          },
          {
            title: "Pos",
            property: "positionCode",
          },
          ...specificData,
        ]}
        dataSource={skaterSource}
      />
      <Header as="h4">Goalies</Header>
      <SortableTable
        columnNames={[
          {
            name: "Goalie",
            property: "goalieFullName",
            link: true,
          },
          categories.goalieCategories["gamesPlayed"],
          categories.goalieCategories["gamesStarted"],
          categories.goalieCategories["completeGames"],
          categories.goalieCategories["incompleteGames"],
          categories.goalieCategories["completeGamePct"],
          categories.goalieCategories["qualityStart"],
          categories.goalieCategories["qualityStartsPct"],
          categories.goalieCategories["goalsFor"],
          categories.goalieCategories["goalsAgainst"],
          categories.goalieCategories["goalsForAverage"],
          categories.goalieCategories["goalsAgainstAverage"],
          categories.goalieCategories["regulationWins"],
          categories.goalieCategories["regulationLosses"],
          categories.goalieCategories["shotsAgainstPer60"],
          categories.goalieCategories["savePct"],
          categories.goalieCategories["timeOnIce"],
        ]}
        dataSource={goalieSource}
      />
    </>
  );
}

EnhancedStatsTable.propTypes = {
  skaterStats: PropTypes.arrayOf(PropTypes.object),
  goalieStats: PropTypes.arrayOf(PropTypes.object),
};
