import React from "react";
import { Grid, Label, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Map } from "components";

const StandingsMapControl = styled(Map)`
  width: 100%;
  height: 55vh;
`;

export default function LocationsDisplay({ locations }) {
  return (
    <Segment>
      {locations && (
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column>
              <StandingsMapControl
                center={{ center: [-97.131087, 42.509726] }}
                points={locations.teamLocations}
                zoom={2.5}
                zoomable={false}
              />
            </Grid.Column>
            <Grid.Column>
              {locations.seasonDescription}
              <br />
              <h4>Conferences - legend:</h4>
              {locations.divisions.map((marker, index) => {
                return (
                  <div key={marker.key + index}>
                    <Label color={marker.value}>{marker.key}</Label>
                  </div>
                );
              })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Segment>
  );
}

LocationsDisplay.propTypes = {
  locations: PropTypes.object,
};
