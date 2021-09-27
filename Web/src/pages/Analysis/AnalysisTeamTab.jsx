import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Header } from "semantic-ui-react";
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
import { getColorScheme } from "util/shared";
import {
  createSortedList,
  separateGoaliesAndSkaters,
} from "services/analysis/hooks";

import StatsPieChart from "./StatsPieChart/StatsPieChart";
import Lineup from "./Lineup/Lineup";
import StatsScatterChart from "./StatsScatterChart/StatsScatterChart";
import TeamStatsHeader from "./TeamStatsHeader";
import EnhancedStatsTable from "./EnhancedStatsTable";

const dropdownOptions = [
  { key: "points", text: "Points", value: "points" },
  { key: "goals", text: "Goals", value: "goals" },
  { key: "assists", text: "Assists", value: "assists" },
];

export default function AnalysisTeamTab({ category, team, setCategory }) {
  const colors = getColorScheme(team.team.colorScheme);
  const { skaters, goalies } = separateGoaliesAndSkaters(team.rosterStats);
  const skaterPie = createSortedList(
    skaters.filter((p) => {
      return p.stats.points > 0;
    }),
    category
  );
  const goalieGraph = createSortedList(goalies, "wins");

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
      <TeamStatsHeader team={team} />
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
      <EnhancedStatsTable team={team} />
    </>
  );
}

AnalysisTeamTab.propTypes = {
  player: PropTypes.object,
};
