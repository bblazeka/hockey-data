import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Header, Table } from "semantic-ui-react";

import "./Standings.scss";
import * as actions from "services/league";
import * as teamActions from "services/team";
import { Loader } from "components";
import routes from "routes";
import { getLogo } from "util/assets";
import { selectLocations, selectStandings } from "services/selectors";
import LocationsDisplay from "./LocationsDisplay";

export default function Standings() {
  const { standings } = useSelector(selectStandings);
  const { locations } = useSelector(selectLocations);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getStandings());
    dispatch(teamActions.getTeamLocations());
  }, []);

  if (!standings) {
    return <Loader text="Loading standings..."></Loader>;
  }

  return (
    <>
      <Grid columns={2} stackable>
        {standings &&
          standings.map((entry) => {
            return (
              <Grid.Column className="standings" key={entry.division.id}>
                <Header as="h3">{entry.division.name}</Header>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Rank</Table.HeaderCell>
                      <Table.HeaderCell>Logo</Table.HeaderCell>
                      <Table.HeaderCell>Team</Table.HeaderCell>
                      <Table.HeaderCell>GP</Table.HeaderCell>
                      <Table.HeaderCell>W</Table.HeaderCell>
                      <Table.HeaderCell>L</Table.HeaderCell>
                      <Table.HeaderCell>OT</Table.HeaderCell>
                      <Table.HeaderCell>GS</Table.HeaderCell>
                      <Table.HeaderCell>GA</Table.HeaderCell>
                      <Table.HeaderCell>PTS</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {entry.teamRecords.map((record) => {
                      return (
                        <Table.Row key={`row${record.team.id}`}>
                          <Table.Cell className="bigger-text bold">
                            {record.divisionRank}
                          </Table.Cell>
                          <Table.Cell>
                            <Link to={`${routes.teams}/${record.team.id}`}>
                              <img
                                className="logo"
                                src={getLogo(record.team.id)}
                                alt={`img${record.team.Id}`}
                              ></img>
                            </Link>
                          </Table.Cell>
                          <Table.Cell className="standings-team-name">
                            <Link to={`${routes.teams}/${record.team.id}`}>
                              {record.team.name}
                            </Link>
                          </Table.Cell>
                          <Table.Cell>{record.gamesPlayed}</Table.Cell>
                          <Table.Cell>{record.leagueRecord.wins}</Table.Cell>
                          <Table.Cell>{record.leagueRecord.losses}</Table.Cell>
                          <Table.Cell>{record.leagueRecord.ot}</Table.Cell>
                          <Table.Cell>{record.goalsScored}</Table.Cell>
                          <Table.Cell>{record.goalsAgainst}</Table.Cell>
                          <Table.Cell className="bold">
                            {record.points}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </Grid.Column>
            );
          })}
      </Grid>
      <LocationsDisplay locations={locations} />
    </>
  );
}
