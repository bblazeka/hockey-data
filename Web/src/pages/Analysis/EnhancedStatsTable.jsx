import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Dropdown, Header } from "semantic-ui-react";
import styled from "styled-components";

import routes from "routes";
import SortableTable from "components/SortableTable";
import categories from "util/categories.json";

const dropdownOptions = [
  { key: "even", text: "Even strength", value: "even" },
  { key: "pp", text: "Powerplay", value: "pp" },
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
    return dataType === "even"
      ? [
          categories.skaterCategories["gamesPlayed"],
          categories.skaterCategories["timeOnIcePerGame5v5"],
          categories.skaterCategories["goals5v5"],
          categories.skaterCategories["assists5v5"],
          categories.skaterCategories["primaryAssists5v5"],
          categories.skaterCategories["secondaryAssists5v5"],
          categories.skaterCategories["points5v5"],
          categories.skaterCategories["goalsPer605v5"],
          categories.skaterCategories["assistsPer605v5"],
          categories.skaterCategories["pointsPer605v5"],
          categories.skaterCategories["offensiveZoneStartPct5v5"],
          categories.skaterCategories["satPct"],
          categories.skaterCategories["satRelative5v5"],
          categories.skaterCategories["onIceShootingPct5v5"],
          categories.skaterCategories["satRelative5v5"],
          categories.skaterCategories["netMinorPenaltiesPer60"],
        ]
      : [
          categories.skaterCategories["ppAssists"],
          categories.skaterCategories["ppGoals"],
          categories.skaterCategories["ppGoalsForPer60"],
          categories.skaterCategories["ppGoalsPer60"],
          categories.skaterCategories["ppIndividualSatFor"],
          categories.skaterCategories["ppIndividualSatForPer60"],
          categories.skaterCategories["ppPoints"],
          categories.skaterCategories["ppPointsPer60"],
          categories.skaterCategories["ppPrimaryAssists"],
          categories.skaterCategories["ppPrimaryAssistsPer60"],
          categories.skaterCategories["ppSecondaryAssists"],
          categories.skaterCategories["ppSecondaryAssistsPer60"],
          categories.skaterCategories["ppShootingPct"],
          categories.skaterCategories["ppShots"],
          categories.skaterCategories["ppShotsPer60"],
          categories.skaterCategories["ppTimeOnIce"],
          categories.skaterCategories["ppTimeOnIcePctPerGame"],
          categories.skaterCategories["ppTimeOnIcePerGame"],
        ];
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
