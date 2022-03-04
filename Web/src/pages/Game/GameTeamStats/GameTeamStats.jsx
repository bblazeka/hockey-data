import React from "react";
import { Header, Segment, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Loader, SortableTable } from "components";
import routes from "routes";
import { getLogo } from "util/assets";
import { IsNullOrUndefined } from "util/common";
import categories from "util/categories.json";

const TeamTableStyled = styled.div`
  overflow-x: auto;
`;

function GameTeamStats(props) {
  const { team } = props;
  if (IsNullOrUndefined(team)) {
    return <Loader></Loader>;
  }

  const skaterStats = team.skaters.map((skater) => ({
    ...skater.stats,
    customName: (
      <Table.Cell>
        <Link to={`${routes.player}/${skater.person.id}`}>
          <Header as="h4">
            {skater.person.fullName}
            <Header.Subheader>
              {`#${skater.jerseyNumber} ${skater.position.name}`}
            </Header.Subheader>
          </Header>
        </Link>
      </Table.Cell>
    ),
  }));

  const goalieStats = team.goalies.map((goalie) => ({
    ...goalie.stats,
    customName: (
      <Table.Cell>
        <Link to={`${routes.player}/${goalie.person.id}`}>
          <Header as="h4">
            {goalie.person.fullName}
            <Header.Subheader>
              {`#${goalie.jerseyNumber} ${goalie.position.name}`}
            </Header.Subheader>
          </Header>
        </Link>
      </Table.Cell>
    ),
  }));
  return (
    <Segment>
      <Header as="h2">
        <img
          className="mid-logo"
          src={getLogo(team.team.id)}
          alt={`img${team.team.id}${team.team.name}`}
        />{" "}
        {team.team.name}
      </Header>
      <Header as="h3">Roster</Header>
      <TeamTableStyled>
        <SortableTable
          columnNames={[
            {
              title: "Skater",
              property: "name",
              customName: true,
            },
            categories.skaterCategories["goals"],
            categories.skaterCategories["assists"],
            categories.skaterCategories["plusMinus"],
            categories.skaterCategories["penaltyMinutes"],
            categories.skaterCategories["powerPlayGoals"],
            categories.skaterCategories["powerPlayAssists"],
            categories.skaterCategories["shortHandedGoals"],
            categories.skaterCategories["shots"],
            categories.skaterCategories["hits"],
            categories.skaterCategories["blocked"],
            categories.skaterCategories["faceOffPct"],
            categories.skaterCategories["timeOnIce"],
            categories.skaterCategories["powerPlayTimeOnIce"],
            categories.skaterCategories["shortHandedTimeOnIce"],
          ]}
          dataSource={skaterStats}
        />
      </TeamTableStyled>
      <Header as="h3">Goalies</Header>
      <SortableTable
        columnNames={[
          {
            title: "Goalie",
            property: "name",
            customName: true,
          },
          { ...categories.goalieCategories["savePercentage"], percent: false },
          categories.goalieCategories["saves"],
          categories.goalieCategories["evenSaves"],
          categories.goalieCategories["powerPlaySaves"],
          categories.goalieCategories["shortHandedSaves"],
          categories.goalieCategories["shots"],
          categories.goalieCategories["evenShotsAgainst"],
          categories.goalieCategories["evenStrengthSavePercentage"],
          categories.goalieCategories["powerPlaySavePercentage"],
          categories.goalieCategories["shortHandedSavePercentage"],
        ]}
        dataSource={goalieStats}
      />
      <Header as="h3">Staff</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(team.coaches).map((coach) => {
            return (
              <Table.Row key={coach.person.fullName}>
                <Table.Cell>{coach.person.fullName}</Table.Cell>
                <Table.Cell>{coach.position.name}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Segment>
  );
}

export default GameTeamStats;
