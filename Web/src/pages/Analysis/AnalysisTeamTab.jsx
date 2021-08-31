import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Header, Statistic, Table } from "semantic-ui-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getLogo } from "util/assets";
import { GetNumberWithOrdinal } from "util/common";
import { getColorScheme } from "util/shared";
import { Lineup } from "components";

import StatsPieChart from "./StatsPieChart/StatsPieChart";
import StatsScatterChart from "./StatsScatterChart/StatsScatterChart";

const dropdownOptions = [
  { key: "points", text: "Points", value: "points" },
  { key: "goals", text: "Goals", value: "goals" },
  { key: "assists", text: "Assists", value: "assists" },
];

export default function AnalysisTeamTab({ category, team, setCategory }) {
  const createStatistic = (text, value) => {
    return (
      <Statistic>
        <Statistic.Value>{value}</Statistic.Value>
        <Statistic.Label>{text}</Statistic.Label>
      </Statistic>
    );
  };
  const createSortedList = (players, category) => {
    const result = [];
    const sortedPlayers = players
      .sort((a, b) => {
        return b.stats[category] - a.stats[category];
      })
      .map((ps) => {
        return {
          label: ps.fullName,
          subLabel: ps.stats[category],
          angle: ps.stats[category],
        };
      });

    sortedPlayers.reduce(function (res, value, index) {
      const id = index > 7 ? "" : value.label;
      if (!res[id]) {
        res[id] = { label: id, subLabel: 0, angle: 0 };
        result.push(res[id]);
      }
      res[id].angle += value.angle;
      res[id].subLabel += value.subLabel;
      return res;
    }, {});
    return result;
  };
  const colors = getColorScheme(team.team.colorScheme);
  const skaterPie = createSortedList(
    team.rosterStats.filter((p) => {
      return p.stats.points > 0;
    }),
    category
  );
  const goalieGraph = createSortedList(
    team.rosterStats.filter((p) => {
      return p.stats.points == null;
    }),
    "wins"
  );

  const skaters = team.rosterStats.filter((p) => {
    return p.stats.points !== null;
  });
  return (
    <>
      <Header as="h1" className="team-header">
        <img
          className="mid-logo"
          src={getLogo(team.id)}
          alt={`img${team.id}${team.team.name}`}
        />
        {team.team.name}
      </Header>
      <Statistic.Group widths="5">
        {createStatistic("League", GetNumberWithOrdinal(team.leagueRank))}
        {createStatistic(
          "League Home",
          GetNumberWithOrdinal(team.leagueHomeRank)
        )}
        {createStatistic(
          "League Road",
          GetNumberWithOrdinal(team.leagueRoadRank)
        )}
        {createStatistic(
          "League Last 10",
          GetNumberWithOrdinal(team.leagueL10Rank)
        )}
        {createStatistic(
          "League Powerplay",
          GetNumberWithOrdinal(team.ppLeagueRank)
        )}
      </Statistic.Group>
      <Statistic.Group widths="5">
        {createStatistic("Division", GetNumberWithOrdinal(team.divisionRank))}
        {createStatistic(
          "Division Home",
          GetNumberWithOrdinal(team.divisionHomeRank)
        )}
        {createStatistic(
          "Division Road",
          GetNumberWithOrdinal(team.divisionRoadRank)
        )}
        {createStatistic(
          "Division Last 10",
          GetNumberWithOrdinal(team.divisionL10Rank)
        )}
        {createStatistic(
          "Division Powerplay",
          GetNumberWithOrdinal(team.ppDivisionRank)
        )}
      </Statistic.Group>
      <div className="team-stats-table">
        <Table>
          <Table.Header>
            <Table.Row>
              {team.stats.map((stat) => {
                return (
                  <Table.HeaderCell key={stat.title + team.id}>
                    {stat.title}
                  </Table.HeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              {team.stats.map((stat) => {
                return (
                  <Table.Cell key={stat.title + team.id}>
                    {stat.value}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <div className="line-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={team.rankingsGraph}
            margin={{
              top: 15,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="x" />
            <YAxis name="Rank" reversed domain={[1, 32]} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="y"
              name="Rank"
              background={{ fill: `${colors[0]}` }}
              fill={`${colors[4]}`}
              stroke={`${colors[4]}`}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="graph-container">
        <div className="filter-container">
          <Header as="h4">
            <Header.Content>
              Player{" "}
              <Dropdown
                header="Category"
                inline
                onChange={(category) => setCategory(category)}
                defaultValue={dropdownOptions[0].value}
                options={dropdownOptions}
              />{" "}
            </Header.Content>
          </Header>
        </div>
        <div className="pie-chart-container">
          <h4>{/*empty space*/}</h4>
          <StatsPieChart values={skaterPie} colorScheme={colors} />
        </div>
        <div className="pie-chart-container">
          <h4 className="pie-chart-header">Goalie wins:</h4>
          <StatsPieChart values={goalieGraph} colorScheme={colors} />
        </div>
      </div>
      <div className="graph-container">
        <div className="scatter-chart-container">
          <StatsScatterChart
            values={skaters}
            xAxisName="Games"
            xKey="stats.games"
            yAxisName={category}
            yKey={`stats.${category}`}
            color={colors[0]}
          />
        </div>
      </div>
      <div className="graph-container">
        <div className="scatter-chart-container">
          <StatsScatterChart
            values={skaters}
            xAxisName="Games"
            xKey="stats.games"
            yAxisName="+/-"
            yKey="stats.plusMinus"
            height={400}
            width={400}
            color={colors[0]}
          />
        </div>
      </div>
      <div className="lineup-container">
        <Lineup lines={team.lines}></Lineup>
      </div>
    </>
  );
}

AnalysisTeamTab.propTypes = {
  player: PropTypes.object,
};
