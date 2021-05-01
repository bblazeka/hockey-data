import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IsNullOrUndefined } from 'common';

import './Lineup.scss';
import { NotFound } from '..';

function Lineup(props) {
  const { lines } = props;
  if (IsNullOrUndefined(lines.lines)) {
    return (<NotFound></NotFound>);
  }
  return (
    <div>
      <h3>Current lineup:</h3>
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
        </Grid.Row>
      </Grid>
    </div>);

}

export default Lineup;