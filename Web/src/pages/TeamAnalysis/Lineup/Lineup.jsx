import React from "react";
import PropTypes from "prop-types";
import { Grid, Header } from "semantic-ui-react";
import styled from "styled-components";

import { NotFound, Loader } from "components";
import { IsNullOrUndefined } from "util/common";

const PlayerNameStyled = styled.div`
  text-align: center;
`;

function Lineup({ lines }) {
  if (IsNullOrUndefined(lines)) {
    return <Loader text="Loading lines..."></Loader>;
  }
  if (IsNullOrUndefined(lines.lines)) {
    return <NotFound text="Lines not found."></NotFound>;
  }
  return (
    <>
      <Header as="h3">
        Current lineup:
        <Header.Subheader>
          Fetched from <a href="https://www.dailyfaceoff.com/">DailyFaceoff</a>.
        </Header.Subheader>
      </Header>
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column>
            {lines.lines.map((line, index) => {
              return (
                <PlayerNameStyled key={`lw${index}`}>
                  {line.leftWing}
                </PlayerNameStyled>
              );
            })}
          </Grid.Column>
          <Grid.Column>
            {lines.lines.map((line, index) => {
              return (
                <PlayerNameStyled key={`c${index}`}>
                  {line.center}
                </PlayerNameStyled>
              );
            })}
          </Grid.Column>
          <Grid.Column>
            {lines.lines.map((line, index) => {
              return (
                <PlayerNameStyled key={`rw${index}`}>
                  {line.rightWing}
                </PlayerNameStyled>
              );
            })}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            {lines.lines.map((line, index) => {
              return (
                <PlayerNameStyled key={`ld${index}`}>
                  {line.leftDefender}
                </PlayerNameStyled>
              );
            })}
          </Grid.Column>
          <Grid.Column>
            {lines.lines.map((line, index) => {
              return (
                <PlayerNameStyled key={`rd${index}`}>
                  {line.rightDefender}
                </PlayerNameStyled>
              );
            })}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <PlayerNameStyled>{lines.goalies.starter}</PlayerNameStyled>
            <PlayerNameStyled>{lines.goalies.backup}</PlayerNameStyled>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

Lineup.propTypes = {
  lines: PropTypes.object,
};

export default React.memo(Lineup);
