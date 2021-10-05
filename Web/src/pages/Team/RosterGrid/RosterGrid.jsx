import React from "react";
import styled from "styled-components";

import { Loader } from "components";

import RosterElement from "../RosterElement/RosterElement";
import { IsNullOrUndefined } from "../../../util/common";

const RosterDisplayStyled = styled.div`
  display: block;
`;

function RosterGrid(props) {
  const { filterPlayers, team } = props;
  if (IsNullOrUndefined(team)) {
    return <Loader></Loader>;
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

export default RosterGrid;
