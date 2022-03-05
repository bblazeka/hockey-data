import React from "react";
import { Label, Segment, Item } from "semantic-ui-react";
import { useQuery } from "@apollo/client";

import { getLogo } from "util/assets";
import { GetNumberWithOrdinal } from "util/common";
import routes from "routes";
import { Loader } from "components";
import { getAnalysis } from "services/analysis/querySchemas";

function getDivisionColor(rank) {
  if (rank <= 2) return "green";
  if (rank <= 3) return "olive";
  if (rank <= 4) return "yellow";
  if (rank <= 6) return "orange";
  return "red";
}

function getLeagueRank(rank) {
  if (rank <= 8) return "green";
  if (rank <= 14) return "olive";
  if (rank <= 18) return "yellow";
  if (rank <= 26) return "orange";
  return "red";
}

export default function Analysis() {
  const { loading: loadingAnalysis, data } = useQuery(getAnalysis);
  if (loadingAnalysis) {
    return <Loader />;
  }
  const { analysis } = data;
  console.log(
    "🚀 ~ file: Analysis.jsx ~ line 16 ~ Analysis ~ analysis",
    analysis
  );
  return (
    <Segment>
      <Item.Group link divided>
        {analysis.map((team, index) => (
          <Item key={team.id} href={`${routes.analysis}/${team.id}`}>
            <Item.Image size="tiny" src={getLogo(team.id)} />
            <Item.Content>
              <Item.Header>
                {index + 1 + "."} {team.team.name}
              </Item.Header>
              <Item.Description>{team.team.name}</Item.Description>
              <Item.Extra>
                <Label basic color={getLeagueRank(team.leagueRank)}>
                  {GetNumberWithOrdinal(team.leagueRank)}
                  <Label.Detail>League</Label.Detail>
                </Label>
                <Label basic color={getDivisionColor(team.divisionRank)}>
                  {GetNumberWithOrdinal(team.divisionRank)}
                  <Label.Detail>Division</Label.Detail>
                </Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
