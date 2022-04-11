import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Loader, Map, NewsFeed, SocialFeed } from "components";
import { getLogo } from "util/assets";
import { selectTeamObject } from "reducers/selectors";
import {getTeam as getTeamQuery} from "services/querySchemas/team";


import TeamSchedule from "./TeamSchedule/TeamSchedule";
import RosterGrid from "./RosterGrid/RosterGrid.jsx";
import { useQuery } from "@apollo/client";
import { fetchTeamData } from "services/teamFunctions";

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
  const dispatch = useDispatch();
  const [filterActive, setFilterActive] = useState(true);
  const { tweets, news, teamGames, location } =
    useSelector(selectTeamObject);
  let { id } = useParams();
  const { data } = useQuery(getTeamQuery, {variables: { id: parseInt(id) }});

  useEffect(() => fetchTeamData(dispatch, data?.team), [data]);
  if (!data) {
    return <Loader />;
  }
  const { team } = data;
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
