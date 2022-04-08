import React from "react";
import { Label, Segment, Icon, Item } from "semantic-ui-react";
import { useQuery } from "@apollo/client";

import { getLogo } from "util/assets";
import { GetNumberWithOrdinal } from "util/common";
import routes from "routes";
import { Loader } from "components";
import { getAnalysis } from "services/querySchemas/analysis";

import {
  getLeagueRank,
  getDivisionColor,
  getPointPercentageColor,
  getTeamDirection,
} from "./functions";

export default function Analysis() {
  const { loading: loadingAnalysis, data } = useQuery(getAnalysis);
  if (loadingAnalysis) {
    return <Loader />;
  }
  const { analysis } = data;
  return (
    <Segment>
      <Item.Group link divided>
        {analysis.map((team, index) => {
          const { formIcon, formColor } = getTeamDirection(
            team.leagueRank,
            team.leagueL10Rank
          );
          return (
            <Item key={team.id} href={`${routes.analysis}/${team.id}`}>
              <Item.Image size="tiny" src={getLogo(team.id)} />
              <Item.Content>
                <Item.Header>
                  {index + 1 + "."} {team.team.name}
                </Item.Header>
                <Item.Description>
                  <Label basic color={getLeagueRank(team.leagueRank)}>
                    {GetNumberWithOrdinal(team.leagueRank)}
                    <Label.Detail>League</Label.Detail>
                  </Label>
                  <Label basic color={getDivisionColor(team.divisionRank)}>
                    {GetNumberWithOrdinal(team.divisionRank)}
                    <Label.Detail>Division</Label.Detail>
                  </Label>
                  <Label>
                    {team.statsSingleSeason.wins}
                    <Label.Detail>W</Label.Detail>
                  </Label>
                  <Label>
                    {team.statsSingleSeason.losses}
                    <Label.Detail>L</Label.Detail>
                  </Label>
                  <Label>
                    {team.statsSingleSeason.ot}
                    <Label.Detail>OT</Label.Detail>
                  </Label>
                  <Label>
                    {team.statsSingleSeason.pts}
                    <Label.Detail>PTS</Label.Detail>
                  </Label>
                  <Label
                    circular
                    basic
                    color={getPointPercentageColor(
                      team.statsSingleSeason.ptPctg
                    )}
                  >
                    {team.statsSingleSeason.ptPctg}%
                    <Label.Detail>
                      <Icon
                        color={formColor}
                        name={formIcon}
                        title="Change in last 10 games"
                      />
                    </Label.Detail>
                  </Label>
                </Item.Description>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
}
