import React, { useEffect, useState } from "react";
import { Button, Dropdown, Segment } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { findGames } from "reducers/gameActions";
import { getLogo } from "util/assets";
import config from "util/config.json";
import { selectGameList } from "reducers/selectors";
import { getDropdownTeams } from "reducers/teamActions";

import GameList from "./GameList";
import GameListStatistics from "./GameListStatistics";

const GameListFilterStyled = styled(Segment)`
  .ui.dropdown.search {
    min-width: 15vw;
  }
`;

const DropdownStyled = styled(Dropdown)`
  margin-right: 1vw;
`;

export default function GameSelection() {
  const [team, setTeam] = useState(-1);
  const [opponent, setOpponent] = useState(-1);
  const [season, setSeasonId] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDropdownTeams());
  }, []);

  const { gamesBetweenTeams, dropdownTeams } = useSelector(selectGameList);

  return (
    <>
      <GameListFilterStyled>
        {dropdownTeams && (
          <>
            <DropdownStyled
              placeholder="Team"
              selection
              search
              onChange={(_event, data) => setTeam(data.value)}
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
              placeholder="Opponent"
              selection
              search
              onChange={(_event, data) => setOpponent(data.value)}
              options={dropdownTeams.map((el) => {
                return {
                  key: el.id,
                  text: el.name,
                  value: el.id,
                  image: { avatar: true, src: getLogo(el.id) },
                };
              })}
            />
          </>
        )}
        <DropdownStyled
          placeholder="Season"
          selection
          onChange={(_event, data) => setSeasonId(data.value)}
          options={config.seasons.concat({
            value: undefined,
            key: "all",
            text: "All seasons",
          })}
        />
        <Button
          onClick={() => dispatch(findGames(team, opponent, season))}
        >
          Search
        </Button>
      </GameListFilterStyled>
      <Segment>
        {gamesBetweenTeams && (
          <GameListStatistics gamesBetweenTeams={gamesBetweenTeams} />
        )}
        <GameList />
      </Segment>
    </>
  );
}
