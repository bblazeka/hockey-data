import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getTeam } from "reducers/teamActions";
import { Loader, Map, NewsFeed, SocialFeed } from "components";
import { getLogo } from "util/assets";
import { getNews, getTweets, geocode } from "reducers/miscActions";
import { getTeamSchedule } from "reducers/leagueActions";
import { DateToServerFormat, IsNullOrUndefined } from "util/common";
import { selectTeamObject } from "reducers/selectors";

import TeamSchedule from "./TeamSchedule/TeamSchedule";
import RosterGrid from "./RosterGrid/RosterGrid.jsx";

const MapComponent = styled(Segment)`
  display: flex;
`;

const MapControl = styled(Map)`
  width: 250vw;
`;

const DescriptionContainer = styled.p`
  font-size: 12px;
`;

const LocationText = styled.div`
  padding: 15px;
`;

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
      const teamSocialQuery = `${team.name} hockey`;
      dispatch(geocode(`${team.venue.name} ${team.venue.city}`));
      dispatch(getNews(teamSocialQuery));
      dispatch(getTweets(teamSocialQuery));
      const today = new Date();
      const finish = new Date(today);
      finish.setDate(finish.getDate() + 14);
      const start = DateToServerFormat(today);
      const end = DateToServerFormat(finish);
      dispatch(getTeamSchedule(team.id, start, end));
    }
  }, [team]);
  if (!team) {
    return <Loader />;
  }
  return (
    <>
      <Header as="h1">
        <Image
          circular
          className="mid-logo"
          src={getLogo(team.id)}
          alt={`img${team.id}${team.name}`}
        />
        {team.name}
      </Header>
      <DescriptionContainer>{team.description}</DescriptionContainer>
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
        <MapComponent>
          <MapControl points={[location]} center={location} zoom={8} />
          <LocationText>
            <Header as="h4">
              {team.venue.name}
              <Header.Subheader>{team.venue.city}</Header.Subheader>
            </Header>
            <p>{team.venue.description}</p>
          </LocationText>
        </MapComponent>
      )}
    </>
  );
}
