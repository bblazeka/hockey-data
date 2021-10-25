import React from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

import routes from "routes";
import SortableTable from "components/SortableTable";

export default function EnhancedStatsTable({ teamStats }) {
  const dataSource = teamStats.map((p) => {
    return { ...p, link: `${routes.player}/${p.playerId}` };
  });
  return (
    <>
      <Header as="h4">Stats 5v5</Header>
      <SortableTable
        columnNames={[
          {
            name: "Player",
            property: "skaterFullName",
            link: true,
          },
          { name: "GP", property: "gamesPlayed" },
          { name: "G5v5", property: "goals5v5" },
          { name: "G5v5/60", property: "goalsPer605v5" },
          { name: "A5v5", property: "assists5v5" },
          { name: "A5v5/60", property: "assistsPer605v5" },
          { name: "P5v5", property: "points5v5" },
          { name: "P5v5/60", property: "pointsPer605v5" },
          { name: "OZS", property: "offensiveZoneStartPct5v5" },
          { name: "SAT%", property: "satPct" },
          { name: "SAT5v5", property: "satRelative5v5" },
        ]}
        dataSource={dataSource}
      />
    </>
  );
}

EnhancedStatsTable.propTypes = {
  teamStats: PropTypes.arrayOf(PropTypes.object),
};
