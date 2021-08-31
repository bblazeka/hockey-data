import React from "react";
import { Grid, Label, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";

import { Map } from "components";
import "./Standings.scss";

export default function LocationsDisplay({ locations }) {
  return (
    <Segment>
      {locations && (
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column>
              <Map
                className="standingsMapControl"
                center={{ center: [-97.131087, 42.509726] }}
                points={locations.teamLocations}
                zoom={2.5}
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
