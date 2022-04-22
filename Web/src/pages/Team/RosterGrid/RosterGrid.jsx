import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Loader } from "components";

import RosterElement from "../RosterElement/RosterElement";

const RosterDisplayStyled = styled.div`
  display: block;
`;

function RosterGrid({ filterPlayers, team }) {
  if (!team) {
    return <Loader/>;
  }
  return (
    <>
      <RosterDisplayStyled>
        <RosterElement
          title={"Goalies"}
          players={team.goalies}
          filterPlayers={filterPlayers}
        />
        <RosterElement
          title={"Defenders"}
          players={team.defenders}
          filterPlayers={filterPlayers}
        />
        <RosterElement
          title={"Forwards"}
          players={team.forwards}
          filterPlayers={filterPlayers}
        />
      </RosterDisplayStyled>
    </>
  );
}

RosterGrid.propTypes = {
  filterPlayers: PropTypes.bool,
  team: PropTypes.object,
};

export default RosterGrid;
