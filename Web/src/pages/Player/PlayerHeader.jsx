import React from "react";
import { Link } from "react-router-dom";
import { Flag, Grid, Header, Image, List, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import routes from "../../routes";
import { getLogo } from "util/assets";
import {
  generateSemanticUICountryId,
  FormatNumberToCurrency,
} from "util/common";

export default function PlayerHeader({ player }) {
  return (
    <Segment textAlign="center">
      <Grid columns="equal">
        <Grid.Column width={3}>
          <Image src={getLogo(player.currentTeam?.id)} size="medium"></Image>
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column floated="left">
                <Header as="h2">
                  {player.fullName}
                  <Header.Subheader>
                    <Flag
                      name={generateSemanticUICountryId(player.nationality)}
                    />{" "}
                    {player.nationality}
                  </Header.Subheader>
                </Header>
              </Grid.Column>
              <Grid.Column key="colInfo" floated="right" width={8}>
                <List horizontal className="info-list">
                  <List.Item>
                    <List.Icon name="map marker" />
                    <List.Header>Position</List.Header>
                    <List.Content>{player.primaryPosition.name}</List.Content>
                  </List.Item>
                  {player.currentTeam && (
                    <List.Item>
                      <List.Icon name="users" />
                      <List.Header>Team</List.Header>
                      <Link to={`${routes.teams}/${player.currentTeam.id}`}>
                        {player.currentTeam.name}
                      </Link>
                    </List.Item>
                  )}
                  <List.Item>
                    <List.Icon name="user" />
                    <List.Header>Age</List.Header>
                    <List.Content>{player.currentAge}</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="birthday cake" />
                    <List.Header>Birthdate</List.Header>
                    <List.Content>
                      {dayjs(player.birthDate).format("DD.MM.YYYY")}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="map pin" />
                    <List.Header>Birthplace</List.Header>
                    <List.Content>{player.birthCity}</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="dollar" />
                    <List.Header>Cap Hit</List.Header>
                    <List.Content>
                      {FormatNumberToCurrency(player.capHit)}
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="player-desc">
                {player.description}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

PlayerHeader.propTypes = {
  player: PropTypes.object,
};
