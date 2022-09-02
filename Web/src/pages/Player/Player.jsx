import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Tab } from "semantic-ui-react";

import { PlayerSearchBox } from "components/collection";
import { selectPlayerData } from "reducers/selectors";
import { Loader } from "components";

import {getPlayer, searchBasicPlayer} from "reducers/playerActions";
import PlayerStatsGrid from "./PlayerStatsGrid/PlayerStatsGrid";
import PlayerHeader from "./PlayerHeader";
import PlayerSocial from "./PlayerSocial";
import MonthlyStatsGrid from "./PlayerStatsGrid/MonthlyStatsGrid";
import GameLogGrid from "./PlayerStatsGrid/GameLogStatsGrid";

export default function Player() {
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { player, suggestions } = useSelector(selectPlayerData);
  const history = useHistory();

  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlayer(id));
  }, [id]);

  if (!player) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  const isSkater = player.primaryPosition.code !== "G";

  function handleSearchChange(e, { value }) {
    setLoading(true);
    setSearchQuery(value);

    if (searchQuery.length < 1 && value.length < 1) {
      setLoading(false);
    }

    if (value.length > 2) {
      dispatch(searchBasicPlayer(value));
    } else {
      setLoading(false);
    }
  }

  function handleResultSelect(_, { result }) {
    setSearchQuery("");
    setLoading(false);
    history.push(`${result.id}`);
  }
  const renderNHLStatsPane = () => (
    <Tab.Pane>
      <PlayerStatsGrid
        data={player.nhlStats}
        skater={isSkater}
        detailed={true}
      />
    </Tab.Pane>
  );
  const renderMonthlyStatsPane = () => (
    <Tab.Pane>
      <MonthlyStatsGrid skater={isSkater} />
    </Tab.Pane>
  );
  const renderGameLogPane = () => (
    <Tab.Pane>
      <GameLogGrid skater={isSkater} />
    </Tab.Pane>
  );
  const renderCareerStatsPane = () => (
    <Tab.Pane>
      <PlayerStatsGrid
        data={player.careerStats}
        skater={isSkater}
        detailed={false}
      />
    </Tab.Pane>
  );
  const panes = [
    {
      menuItem: "NHL stats",
      render: renderNHLStatsPane,
    },
    {
      menuItem: "Monthly stats",
      render: renderMonthlyStatsPane,
    },
    {
      menuItem: "Game log",
      render: renderGameLogPane,
    },
    {
      menuItem: "Career stats",
      render: renderCareerStatsPane,
    },
  ];
  return (
    <>
      <PlayerSearchBox
        loading={isLoading}
        onResultSelect={handleResultSelect}
        onSearchChange={handleSearchChange}
        results={suggestions}
        value={searchQuery}
      />
      <PlayerHeader player={player} />
      <Tab panes={panes} />
      <PlayerSocial player={player}/>
    </>
  );
}
