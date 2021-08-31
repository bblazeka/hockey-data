import React from 'react';
import PropTypes from 'prop-types';
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
    return (<NotFound text='Lines not found.'></NotFound>);
  }
  return (
    <>
      <Header as='h3'>
        Current lineup:
        <Header.Subheader>
          Fetched from <a href="https://www.dailyfaceoff.com/">DailyFaceoff</a>.
        </Header.Subheader>
      </Header>
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
            {lines.lines.map((line, index) => {
              return (<div key={'lw' + index} className='centered-text'>{line.leftWing}</div>
              );
            })}
          </Grid.Column>
          <Grid.Column>
            {lines.lines.map((line, index) => {
              return (<div key={'c' + index} className='centered-text'>{line.center}</div>
              );
            })}
          </Grid.Column>
          <Grid.Column>
            {lines.lines.map((line, index) => {
              return (<div key={'rw' + index} className='centered-text'>{line.rightWing}</div>
              );
            })}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            {lines.lines.map((line, index) => {
              return (<div key={'ld' + index} className='centered-text'>{line.leftDefender}</div>
              );
            })}
          </Grid.Column>
          <Grid.Column>
            {lines.lines.map((line, index) => {
              return (<div key={'rd' + index} className='centered-text'>{line.rightDefender}</div>
              );
            })}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className='centered-text'>{lines.goalies.starter}</div>
            <div className='centered-text'>{lines.goalies.backup}</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>);

}


Lineup.propTypes = {
  lines: PropTypes.object
};

export default React.memo(Lineup);