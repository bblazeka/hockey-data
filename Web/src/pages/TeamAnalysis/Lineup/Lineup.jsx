import React from "react";
import PropTypes from "prop-types";
import { Grid, Header } from "semantic-ui-react";
import styled from "styled-components";

import { NotFound, Loader } from "components";
import routes from "routes";

const PlayerNameStyled = styled.div`
  text-align: center;
`;

function renderPlayerNameComponent(linePlayer, key) {
  if (!linePlayer) {
    return <></>;
  }
  const { id, name, number } = linePlayer;
  return (<PlayerNameStyled key={key}>
    <a href={`${routes.player}/${id}`}>#{number} {name}</a>
  </PlayerNameStyled>);
}

function Lineup({ lines }) {
  if (!lines) {
    return <Loader text="Loading lines..."></Loader>;
  }
  if (!lines.lines) {
    return <NotFound text="Lines not found."></NotFound>;
  }
  const [leftDefenders, rightDefenders, leftWings, centers, rightWings] = [[],[],[],[],[]];
  
  lines.lines.map((line, index) => {
    leftWings.push(renderPlayerNameComponent(line.leftWing, `lw${index}`));
    centers.push(renderPlayerNameComponent(line.center, `c${index}`));
    rightWings.push(renderPlayerNameComponent(line.rightWing, `rw${index}`));
    leftDefenders.push(renderPlayerNameComponent(line.leftDefender, `ld${index}`));
    rightDefenders.push(renderPlayerNameComponent(line.rightDefender, `rd${index}`));
  });
  return (
    <>
      <Header as="h3">
        Current lineup:
        <Header.Subheader>
          Fetched from <a href="https://www.dailyfaceoff.com/">DailyFaceoff</a>.
        </Header.Subheader>
      </Header>
      <Grid verticalAlign='middle' centered>
        <Grid.Row columns={3}>
          <Grid.Column>
            {leftWings}
          </Grid.Column>
          <Grid.Column>
            {centers}
          </Grid.Column>
          <Grid.Column>
            {rightWings}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            {leftDefenders}
          </Grid.Column>
          <Grid.Column>
            {rightDefenders}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column>
            <PlayerNameStyled>{renderPlayerNameComponent(lines.goalies.starter, "g1")}</PlayerNameStyled>
            <PlayerNameStyled>{renderPlayerNameComponent(lines.goalies.backup, "g2")}</PlayerNameStyled>
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
