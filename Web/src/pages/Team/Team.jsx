import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Grid, Header, Segment } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { getTeam } from "services/team";
import { Loader, Map, NewsFeed, SocialFeed } from "components";
import { getLogo } from "util/assets";
import { getNews, getTweets } from "services/news";
import { geocode } from "services/util";
import { getTeamSchedule } from "services/league";
import { DateToServerFormat, IsNullOrUndefined } from "util/common";
import { selectTeamObject } from "services/selectors";

import "./Team.scss";
import TeamSchedule from "./TeamSchedule/TeamSchedule";
import RosterGrid from "./RosterGrid/RosterGrid.jsx";

export default function Team() {
  const [filterActive, setFilterActive] = useState(true);
  const { team, tweets, news, teamGames, location } =
    useSelector(selectTeamObject);
  let { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeam(id));
  }, [id]);
  useEffect(() => {
    if (!IsNullOrUndefined(team)) {
      dispatch(geocode(`${team.venue.name} ${team.venue.city}`));
      dispatch(getNews(team.name));
      dispatch(getTweets(team.name));
      const today = new Date();
      const finish = new Date(today);
      finish.setDate(finish.getDate() + 14);
      const start = DateToServerFormat(today);
      const end = DateToServerFormat(finish);
      dispatch(getTeamSchedule(team.id, start, end));
    }
  }, [team]);
  if (!team) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }
  return (
    <>
      <Header as="h1" className="team-header">
        <img
          className="mid-logo"
          src={getLogo(team.id)}
          alt={`img${team.id}${team.name}`}
        />
        {team.name}
      </Header>
      <p className="desc">{team.description}</p>
      <RosterGrid team={team} filterPlayers={filterActive} />
      <Segment>
        <Checkbox
          checked={filterActive}
          label="Show active players only"
          onChange={(_, data) => {
            setFilterActive(data.checked);
          }}
        />
      </Segment>
      <TeamSchedule games={teamGames} />
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
      {location && (
        <Segment className="mapComponent">
          <Map
            className="mapControl"
            points={[location]}
            center={location}
            zoom={8}
          />
          <div className="location-text">
            <Header as="h4">
              {team.venue.name}
              <Header.Subheader>{team.venue.city}</Header.Subheader>
            </Header>
            <p>{team.venue.description}</p>
          </div>
        </Segment>
      )}
    </>
  );
}
