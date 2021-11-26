import React, { useEffect, useState } from "react";
import { Button, Dropdown, Segment } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import * as actions from "services/game";
import * as teamActions from "services/team";
import { getLogo } from "util/assets";
import { Loader } from "components";
import { IsNullOrUndefined } from "util/common";
import { selectGameList } from "services/selectors";

import GameList from "./GameList";
import GameListStatistics from "./GameListStatistics";

const GameListFilterStyled = styled(Segment)`
  . > div {
    margin-right: 1vw;
    div {
      width: 15vw;
    }
`;

const DropdownStyled = styled(Dropdown)`
  margin-right: 1vw;
`;

export default function GameSelection() {
  const [home, setHome] = useState(-1);
  const [away, setAway] = useState(-1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(teamActions.getDropdownTeams());
  }, []);

  const { gamesBetweenTeams, dropdownTeams, loading, loadingTeams } =
    useSelector(selectGameList);
  if (loading || loadingTeams || IsNullOrUndefined(dropdownTeams)) {
    return <Loader></Loader>;
  }

  return (
    <>
      <GameListFilterStyled>
        <DropdownStyled
          placeholder="Home team"
          onChange={(_event, data) => setHome(data.value)}
          options={dropdownTeams.map((el) => {
            return {
              key: el.id,
              text: el.name,
              value: el.id,
              image: { avatar: true, src: getLogo(el.id) },
            };
          })}
        />
        <DropdownStyled
          placeholder="Away team"
          onChange={(_event, data) => setAway(data.value)}
          options={dropdownTeams.map((el) => {
            return {
              key: el.id,
              text: el.name,
              value: el.id,
              image: { avatar: true, src: getLogo(el.id) },
            };
          })}
        />
        <Button onClick={() => dispatch(actions.findGames(home, away))}>
          Search
        </Button>
      </GameListFilterStyled>
      <Segment>
        {gamesBetweenTeams && (
          <GameListStatistics gamesBetweenTeams={gamesBetweenTeams} />
        )}
        <GameList gamesBetweenTeams={gamesBetweenTeams} />
      </Segment>
    </>
  );
}
