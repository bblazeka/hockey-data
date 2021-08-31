import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Search, Tab } from "semantic-ui-react";

import { selectPlayerData } from "services/selectors";
import { IsNullOrUndefined } from "util/common";
import { getTweets, getNews } from "services/news";
import { Loader, NewsFeed, SocialFeed } from "components";

import * as actions from "../../services/player";
import "./Player.scss";
import PlayerStatsGrid from "./PlayerStatsGrid/PlayerStatsGrid";
import PlayerHeader from "./PlayerHeader";

export default function Player() {
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { player, suggestions, tweets, news } = useSelector(selectPlayerData);

  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getPlayer(id));
  }, [id]);

  useEffect(() => {
    if (!IsNullOrUndefined(player)) {
      dispatch(getNews(player.fullName));
      dispatch(getTweets(player.fullName));
    }
  }, [player]);

  if (!player) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  function handleSearchChange(e, { value }) {
    setLoading(true);
    setSearchQuery(value);

    if (searchQuery.length < 1 && value.length < 1) {
      setLoading(false);
    }

    if (value.length > 2) {
      dispatch(actions.searchBasicPlayer(value));
    } else {
      setLoading(false);
    }
  }

  function handleResultSelect(e, { result }) {
    setSearchQuery("");
    setLoading(false);
    dispatch(actions.getPlayer(result.id));
  }
  const renderNHLStatsPane = () => (
    <Tab.Pane>
      <PlayerStatsGrid
        data={player.nhlStats}
        skater={player.primaryPosition.code !== "G"}
        detailed={true}
      ></PlayerStatsGrid>
    </Tab.Pane>
  );
  const renderCareerStatsPane = () => (
    <Tab.Pane>
      <PlayerStatsGrid
        data={player.careerStats}
        skater={player.primaryPosition.code !== "G"}
        detailed={false}
      ></PlayerStatsGrid>
    </Tab.Pane>
  );
  const panes = [
    {
      menuItem: "NHL stats",
      render: renderNHLStatsPane,
    },
    {
      menuItem: "Career stats",
      render: renderCareerStatsPane,
    },
  ];
  return (
    <>
      <Search
        className="search-box"
        loading={isLoading}
        onResultSelect={handleResultSelect}
        onSearchChange={handleSearchChange}
        results={suggestions}
        value={searchQuery}
      />
      <PlayerHeader player={player} />
      <Tab panes={panes} />
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <NewsFeed news={news}></NewsFeed>
          </Grid.Column>
          <Grid.Column>
            <SocialFeed tweets={tweets}></SocialFeed>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
