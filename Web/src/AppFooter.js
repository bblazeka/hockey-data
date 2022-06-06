import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import styled from "styled-components";

import { TinyLogo } from "components/collection";

const FooterContainer = styled.footer`
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #282c34;
  color: white;
  text-align: center;
  padding-top: 1em;
`;

export default function AppFooter() {
  return (
    <FooterContainer>
      <Grid columns="equal" stackable>
        <Grid.Row>
          <Grid.Column>
            <TinyLogo src={"/favicon.ico"} alt={"imgapplogo"} />
            <div>HOCKEY DATA ANALYSIS</div>
          </Grid.Column>
          <Grid.Column>
            <div>This is a DEMO project only.</div>
            <div>I do not own data or graphics on this page.</div>
          </Grid.Column>
          <Grid.Column>
            <div>
              Source:{" "}
              <a
                href="https://github.com/bblazeka/hockey-data.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="github" />
              </a>
            </div>
            <div>
              <Icon name="node" /> <Icon name="react" /> GraphQL MongoDB
            </div>
          </Grid.Column>
          <Grid.Column>
            <div>
              <a href="https://www.mapbox.com/Mapbox">Mapbox</a> for maps
            </div>
            <div>
              Made using <a href="https://semantic-ui.com/">Semantic UI</a>
            </div>
          </Grid.Column>
          <Grid.Column>
            <div>
              Logos provided by{" "}
              <a href="https://www.puckmarks.net/nhl-logos">Puckmarks</a>
            </div>
            <div>
              Icons made by{" "}
              <a
                href="https://www.flaticon.com/authors/prettycons"
                title="prettycons"
              >
                prettycons
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      NHL and the NHL Shield are registered trademarks of the National Hockey
      League. NHL and NHL team marks are the property of the NHL and its teams.
      © NHL 2021. All Rights Reserved.
    </FooterContainer>
  );
}
