import React from "react";
import { Table } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
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
import { FormatDecimals, numberToMonthName } from "util/common";
import { Loader } from "components";
import {
  getSkaterDetailedStats,
  getGoalieDetailedStats,
} from "services/querySchemas/player";
import config from "util/config.json";

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

function MonthlyStatsGrid({ skater }) {
  let { id } = useParams();
  const query = skater ? getSkaterDetailedStats : getGoalieDetailedStats;

  const { loading, data: dataRaw } = useQuery(query, {
    variables: { id: parseInt(id), seasonId: config.currentSeason },
  });
  if (loading) {
    return <Loader></Loader>;
  }
  const { byMonth } = dataRaw.playerDetailedStats;

  const categorySet = skater
    ? categories.skaterCategories
    : categories.goalieCategories;

  const exampleObject = byMonth[byMonth.length - 1].stat;
  const displayedCategories = Object.values(categorySet).filter((cat) => {
    return cat.property in exampleObject;
  });
  const data = byMonth.map((month) => ({
    ...month,
    monthName: numberToMonthName(month.month),
  }));
  return (
    <PlayerStatsGridStyled>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Season</Table.HeaderCell>
            <Table.HeaderCell>Month</Table.HeaderCell>
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
          {data.map((stat) => {
            const key = `${id}${stat.season}${stat.month}`;
            return (
              <Table.Row key={`row${key}`}>
                <Table.Cell>{stat.season}</Table.Cell>

                <Table.Cell>{stat.monthName}</Table.Cell>

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
        {data.length === 0 && <div>No stats to show.</div>}
        {data.length > 0 && (
          <ProductionGraphStyled>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthName" />
                <YAxis />
                <Tooltip />
                <Legend />
                {skater && (
                  <Line
                    type="monotone"
                    name="Goals"
                    dataKey="stat.goals"
                    stroke="#8884d8"
                    activeDot={{ r: 2 }}
                  />
                )}
                {skater && (
                  <Line
                    type="monotone"
                    name="Assists"
                    dataKey="stat.assists"
                    stroke="#82ca9d"
                    activeDot={{ r: 2 }}
                  />
                )}
                {!skater && (
                  <Line
                    type="monotone"
                    dataKey="stat.games"
                    stroke="#8884d8"
                    activeDot={{ r: 2 }}
                  />
                )}
                {!skater && (
                  <Line
                    type="monotone"
                    dataKey="stat.wins"
                    stroke="#82ca9d"
                    activeDot={{ r: 2 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </ProductionGraphStyled>
        )}
      </StatBarStyled>
    </PlayerStatsGridStyled>
  );
}

export default MonthlyStatsGrid;
