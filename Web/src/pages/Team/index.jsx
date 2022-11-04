import React, { useState } from "react";
import { Button, Grid, Header, Icon, Segment } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import { Loader, NewsFeed, SocialFeed } from "components";
import { getLogo } from "util/assets";
import routes from "routes";
import { useTeamData } from "services/hooks/team";
import {getTeam as getTeamQuery} from "services/querySchemas/team";
import { MidLogoImage } from "components/collection";

import TeamSchedule from "./TeamSchedule";
import RosterGrid from "./RosterGrid.jsx";

const DescriptionContainer = styled.p`
  font-size: 12px;
`;

export default function Team() {
  const [filterActive, setFilterActive] = useState(true);
  
  let { id } = useParams();
  const { loading, data } = useQuery(getTeamQuery, {variables: { id: parseInt(id) }});

  const { teamDataLoading, tweets, news, teamGames } = useTeamData(data?.team);
  if (loading || teamDataLoading) {
    return <Loader />;
  }
  const { team } = data;
  return (
    <>
      <Header as="h1">
        <MidLogoImage
          circular
          src={getLogo(team.id)}
          alt={`img${team.id}${team.name}`}
        />
        {team.name}
      </Header>
      <DescriptionContainer>{team.description}</DescriptionContainer>
      <RosterGrid team={team} filterPlayers={filterActive} />
      <Segment>
        <Button as="a" href={`${routes.analysis}/${team.id}`} icon labelPosition='left'>
          <Icon name='line graph' /> Analysis
        </Button>
        <Button
          active={filterActive}
          onClick={() => setFilterActive(!filterActive)}
        >{filterActive ? "Show all players" : "Hide inactive players"}
          </Button>
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
    </>
  );
}
