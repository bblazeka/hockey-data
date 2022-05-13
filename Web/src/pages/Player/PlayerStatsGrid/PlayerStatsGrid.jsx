import React from "react";
import { Table, Header } from "semantic-ui-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

import categories from "util/categories.json";
import { getLogo } from "util/assets";
import { FormatDecimals } from "util/common";
import { Loader } from "components";
import PlayerStatsSummary from "./PlayerStatsSummary";

const PlayerStatsGridStyled = styled.div`
  padding: 8px;
`;

const ProductionGraphStyled = styled.div`
  width: 67vw;
  height: 40vh;
`;

const StatBarStyled = styled.div`
  display: flex;
`;

function PlayerStatsGrid({ data, skater, detailed }) {
  if (!data) {
    return <Loader />;
  }
  const { stats, seasonSums } = data;

  const categorySet = skater
    ? categories.skaterCategories
    : categories.goalieCategories;

  const exampleObject = stats[stats.length - 1].stat;
  const displayedCategories = Object.values(categorySet).filter((cat) => {
    return cat.property in exampleObject;
  });
  return (
    <PlayerStatsGridStyled>
      <Header as="h4">Statistics</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Season</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Team</Table.HeaderCell>
            {!detailed && <Table.HeaderCell>League</Table.HeaderCell>}
            {displayedCategories.map((cat, index) => {
              return (
                <Table.HeaderCell
                  key={`headercol${index}`}
                  title={cat.description}
                >
                  {cat.title}
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {stats.map((stat, index) => {
            const logo = getLogo(stat.team.id);
            const key = `${stat.team.id}${stat.team.name}${index}${stat.season}`;
            return (
              <Table.Row key={`row${key}`}>
                <Table.Cell>{stat.season}</Table.Cell>
                <Table.Cell>
                  {logo && (
                    <img
                      className="small-logo"
                      src={logo}
                      alt={`img${key}`}
                    ></img>
                  )}
                </Table.Cell>
                <Table.Cell>{stat.team.name}</Table.Cell>
                {!detailed && (
                  <Table.Cell>{stat.league ? stat.league.name : ""}</Table.Cell>
                )}
                {displayedCategories.map((category, i) => {
                  let value = stat.stat[category.property];
                  if (category.property === "savePercentage") {
                    value = FormatDecimals(value * 100, 1);
                  } else if (
                    [
                      "goalAgainstAverage",
                      "evenStrengthSavePercentage",
                      "powerPlaySavePercentage",
                      "shortHandedSavePercentage",
                    ].includes(category.property)
                  ) {
                    value = FormatDecimals(value, 2);
                  }
                  return <Table.Cell key={`col${i}`}>{value}</Table.Cell>;
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <StatBarStyled>
        {stats.length === 0 && <div>No stats to show.</div>}
        {stats.length > 0 && detailed && (
          <ProductionGraphStyled>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={seasonSums}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="season" />
                <YAxis />
                <Tooltip />
                <Legend />
                {skater && (
                  <Line
                    type="monotone"
                    dataKey="goals"
                    stroke="#8884d8"
                    activeDot={{ r: 2 }}
                  />
                )}
                {skater && (
                  <Line
                    type="monotone"
                    dataKey="assists"
                    stroke="#82ca9d"
                    activeDot={{ r: 2 }}
                  />
                )}
                {!skater && (
                  <Line
                    type="monotone"
                    dataKey="games"
                    stroke="#8884d8"
                    activeDot={{ r: 2 }}
                  />
                )}
                {!skater && (
                  <Line
                    type="monotone"
                    dataKey="wins"
                    stroke="#82ca9d"
                    activeDot={{ r: 2 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </ProductionGraphStyled>
        )}
        <PlayerStatsSummary data={data} />
      </StatBarStyled>
    </PlayerStatsGridStyled>
  );
}

export default PlayerStatsGrid;
