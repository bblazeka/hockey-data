import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

import './Lineup.scss';
import { NotFound, Loader } from '..';
import { IsNullOrUndefined } from '../../util/common';

function Lineup(props) {
  const { lines } = props;
  if (IsNullOrUndefined(lines)) {
    return (<Loader text='Loading lines...'></Loader>);
  }
  if (IsNullOrUndefined(lines.lines)) {
    return (<NotFound></NotFound>);
  }
  return (
    <>
      <Header as='h3'>
        Current lineup:
        <Header.Subheader>
          Fetched from <a href="https://www.dailyfaceoff.com/">DailyFaceoff</a>.
        </Header.Subheader>
      </Header>
      <Grid columns='equal'>
        {lines.lines.map((line, index) => {
          return (
            <Grid.Row key={line + index}>
              <Grid.Column>
                {line.leftDefender}
              </Grid.Column>
              <Grid.Column>
                {line.rightDefender}
              </Grid.Column>
              <Grid.Column>
                {line.leftWing}
              </Grid.Column>
              <Grid.Column>
                {line.center}
              </Grid.Column>
              <Grid.Column>
                {line.rightWing}
              </Grid.Column>
            </Grid.Row>);
        })}
        <Grid.Row>
          <Grid.Column>
            {lines.goalies.starter}
          </Grid.Column>
          <Grid.Column>
            {lines.goalies.backup}
          </Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
    </>);

}

export default Lineup;