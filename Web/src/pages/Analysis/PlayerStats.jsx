import React from "react";
import PropTypes from "prop-types";

import EnhancedStatsTable from "./EnhancedStatsTable";

export default function PlayerStats({ team }) {
  return (
    <>
      <EnhancedStatsTable team={team} />
    </>
  );
}

PlayerStats.propTypes = {
  team: PropTypes.object,
};
