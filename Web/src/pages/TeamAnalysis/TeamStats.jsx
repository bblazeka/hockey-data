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
import { has } from "lodash";
import styled from "styled-components";

import { getColorScheme } from "util/shared";
import {
  createSortedList,
  separateGoaliesAndSkaters,
} from "services/hooks/analysis";
import categories from "util/categories.json";

import StatsPieChart from "./StatsPieChart";
import StatsScatterChart from "./StatsScatterChart";
import TeamStatsHeader from "./TeamStatsHeader";

const dropdownOptions = [
  { key: "points", text: "Points", value: "points" },
  { key: "goals", text: "Goals", value: "goals" },
  { key: "assists", text: "Assists", value: "assists" },
];

const LineChartContainer = styled.div`
  height: 20vh;
  margin-bottom: 20px;
`;

const ScatterChartContainer = styled.div`
  width: 100%;
  height: 70vh;
`;

const PieChartContainer = styled.div`
  width: 50%;
  height: 40vh;
  overflow: visible;
  min-width: 480px;
`;

const GraphContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PieChartHeader = styled.h4`
  margin-bottom: 0;
`;

const FilterContainer = styled.div`
  margin-right: -8vw;
  z-index: 20;
`;

export default function TeamStats({ category, team, setCategory }) {
  const colors = getColorScheme(team.team.colorScheme);
  const { skaters, goalies } = separateGoaliesAndSkaters(team.rosterStats);
  const skaterPie = createSortedList(
    skaters.filter((p) => {
      return p.stats.points > 0;
    }),
    category
  );

  const max = Math.max.apply(
    Math,
    skaters.map((s) => s.stats.games)
  );
  const goalieGraph = createSortedList(goalies, "wins");
  const rankingsGraph = [];
  for (var key in team.regularSeasonStatRankings) {
    if (key != "__typename" && has(team.regularSeasonStatRankings, key)) {
      var value = team.regularSeasonStatRankings[key];
      rankingsGraph.push({ x: categories.teamCategories[key].title, y: value });
    }
  }

  return (
    <>
      <TeamStatsHeader team={team} />
      <LineChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rankingsGraph}
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
            <Legend wrapperStyle={{ position: "relative" }} />
            <Bar
              dataKey="y"
              name="Rank"
              background={{ fill: `${colors[0]}` }}
              fill={`${colors[4]}`}
              stroke={`${colors[4]}`}
            />
          </BarChart>
        </ResponsiveContainer>
      </LineChartContainer>
      <GraphContainer>
        <FilterContainer>
          <Header as="h4">
            <Header.Content>
              Player{" "}
              <Dropdown
                header="Category"
                inline
                onChange={(_event, data) => setCategory(data.value)}
                defaultValue={dropdownOptions[0].value}
                options={dropdownOptions}
              />{" "}
            </Header.Content>
          </Header>
        </FilterContainer>
        <PieChartContainer>
          <h4>{/*empty space*/}</h4>
          <StatsPieChart values={skaterPie} colorScheme={colors} />
        </PieChartContainer>
        <PieChartContainer>
          <PieChartHeader>Goalie wins:</PieChartHeader>
          <StatsPieChart values={goalieGraph} colorScheme={colors} />
        </PieChartContainer>
      </GraphContainer>
      <GraphContainer>
        <ScatterChartContainer>
          <StatsScatterChart
            values={skaters}
            xAxisName="Games"
            xKey="stats.games"
            yAxisName={category}
            yKey={`stats.${category}`}
            color={colors[0]}
            maxDomain={max}
          />
        </ScatterChartContainer>
      </GraphContainer>
      <GraphContainer>
        <ScatterChartContainer>
          <StatsScatterChart
            values={skaters}
            xAxisName="Games"
            xKey="stats.games"
            yAxisName="+/-"
            yKey="stats.plusMinus"
            color={colors[0]}
            maxDomain={max}
          />
        </ScatterChartContainer>
      </GraphContainer>
    </>
  );
}

TeamStats.propTypes = {
  category: PropTypes.string,
  team: PropTypes.object,
  setCategory: PropTypes.func,
};
