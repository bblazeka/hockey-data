import React from "react";
import { Header } from "semantic-ui-react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Loader, NotFound, SortableTable } from "components";
import { IsNullOrUndefined } from "util/common";
import categories from "util/categories.json";
import routes from "routes";

const RosterStatsStyled = styled.div`
  padding: 5px;
  overflow-x: auto;
`;

function RosterStatsGrid({ skaterStats, goalieStats }) {
  if (IsNullOrUndefined(skaterStats) && IsNullOrUndefined(goalieStats)) {
    return <Loader text="Loading stats..."></Loader>;
  }
  if (skaterStats.length === 0 && goalieStats.length === 0) {
    return <NotFound text={`Stats not found.`}></NotFound>;
  }

  return (
    <RosterStatsStyled>
      <Header as="h4">Skater stats</Header>
      <SortableTable
        columnNames={[
          {
            title: "Skater",
            property: "fullName",
            link: true,
          },
          categories.skaterCategories["games"],
          categories.skaterCategories["goals"],
          categories.skaterCategories["assists"],
          categories.skaterCategories["points"],
          categories.skaterCategories["plusMinus"],
          categories.skaterCategories["penaltyMinutes"],
          categories.skaterCategories["powerPlayGoals"],
          categories.skaterCategories["powerPlayPoints"],
          categories.skaterCategories["shortHandedGoals"],
          categories.skaterCategories["shots"],
          categories.skaterCategories["hits"],
          categories.skaterCategories["blocked"],
          categories.skaterCategories["overTimeGoals"],
          categories.skaterCategories["gameWinningGoals"],
          categories.skaterCategories["faceOffPct"],
          categories.skaterCategories["shotPct"],
          categories.skaterCategories["timeOnIce"],
          categories.skaterCategories["evenTimeOnIce"],
          categories.skaterCategories["powerPlayTimeOnIce"],
          categories.skaterCategories["shortHandedTimeOnIce"],
          categories.skaterCategories["timeOnIcePerGame"],
          categories.skaterCategories["shortHandedTimeOnIcePerGame"],
          categories.skaterCategories["powerPlayTimeOnIcePerGame"],
        ]}
        dataSource={skaterStats.map((r) => ({
          ...r,
          ...r.stats,
          link: `${routes.player}/${r.id}`,
        }))}
      />
      <Header as="h4">Goalies stats</Header>
      <SortableTable
        columnNames={[
          {
            title: "Goalie",
            property: "fullName",
            link: true,
          },
          categories.goalieCategories["games"],
          categories.goalieCategories["gamesStarted"],
          categories.goalieCategories["goalAgainstAverage"],
          categories.goalieCategories["savePercentage"],
          categories.goalieCategories["wins"],
          categories.goalieCategories["losses"],
          categories.goalieCategories["ot"],
          categories.goalieCategories["saves"],
          categories.goalieCategories["evenSaves"],
          categories.goalieCategories["powerPlaySaves"],
          categories.goalieCategories["shortHandedSaves"],
          categories.goalieCategories["shotsAgainst"],
          categories.goalieCategories["evenShots"],
          categories.goalieCategories["powerPlayShots"],
          categories.goalieCategories["shortHandedShots"],
          categories.goalieCategories["evenStrengthSavePercentage"],
          categories.goalieCategories["powerPlaySavePercentage"],
          categories.goalieCategories["shortHandedSavePercentage"],
          categories.goalieCategories["shutouts"],
        ]}
        dataSource={goalieStats.map((r) => ({
          ...r,
          ...r.stats,
          link: `${routes.player}/${r.id}`,
        }))}
      />
    </RosterStatsStyled>
  );
}

RosterStatsGrid.PropTypes = {
  skaterStats: PropTypes.arrayOf(PropTypes.object),
  goalieStats: PropTypes.arrayOf(PropTypes.object),
};

export default RosterStatsGrid;
