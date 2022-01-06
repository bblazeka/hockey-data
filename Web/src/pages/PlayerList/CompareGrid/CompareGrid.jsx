import React from "react";
import { Button, Header, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  Radar,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

import "./CompareGrid.scss";
import routes from "../../../routes";
import { IsNullOrUndefined, FormatDecimals } from "../../../util/common";
import { getLogo } from "../../../util/assets";
import { NotFound } from "../../../components";
import config from "../../../util/categories.json";

function displayedProperties(players, exampleObject, statsMode) {
  const displayableCategories = {
    ...config.goalieCategories,
    ...config.skaterCategories,
  };
  const displayedCategories = Object.keys(displayableCategories).filter(
    (key) => key in exampleObject
  );
  displayedCategories.forEach((cat) => {
    return Object.assign(cat, {
      topVal: cat.reverse
        ? Math.min.apply(
            Math,
            players.map(function (o) {
              return o[statsMode][cat.name];
            })
          )
        : Math.max.apply(
            Math,
            players.map(function (o) {
              return o[statsMode][cat.name];
            })
          ),
    });
  });
  return displayableCategories;
}

function CompareGrid(props) {
  const { players, skater, statsSelector, onDelete } = props;
  if (IsNullOrUndefined(players)) {
    return <NotFound />;
  }

  const statsMode = statsSelector || "stats";

  const exampleObject = players.length > 0 ? players[0][statsMode] : {};

  const displayedCategories = displayedProperties(
    players,
    exampleObject,
    statsMode
  );

  const playerNames = players.map((p) => p.fullName);
  const categories = displayedCategories.filter((cat) => {
    return (
      cat.compare &&
      ((skater && cat.skaterCategory) || (!skater && cat.goalieCategory))
    );
  });

  const chartData = categories.map((cat) => {
    const playerScores = {};
    players.forEach((player) => {
      playerScores[player.fullName] =
        (player[statsMode][cat.name] / cat.topVal) * 1.0;
    });
    return { ...cat, playerScores };
  });
  return (
    <div className="grid">
      <Header as="h4">{skater ? "Skaters" : "Goalies"}</Header>
      <div style={{ width: "40vw", height: "30vh", marginBottom: "1vh" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="description" />
            <Legend wrapperStyle={{ position: "relative" }} />
            {playerNames &&
              playerNames.map((pn, i) => {
                return (
                  <Radar
                    key={`radar${i}`}
                    name={pn}
                    dataKey={pn}
                    stroke={scaleOrdinal(schemeCategory10).range()[i % 10]}
                    fill={scaleOrdinal(schemeCategory10).range()[i % 10]}
                    fillOpacity={0.6}
                  />
                );
              })}
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Player</Table.HeaderCell>
            {displayedCategories.map((cat, index) => {
              return (
                <Table.HeaderCell
                  key={`headercol${index}`}
                  title={cat.description}
                >
                  {cat.abbr}
                </Table.HeaderCell>
              );
            })}
            <Table.HeaderCell>Score</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {players.map((player) => {
            const key = `${player.id}`;
            const stats = player[statsMode];
            let countTopValues = 0;
            if (IsNullOrUndefined(stats)) {
              return (
                <Table.Row key={`row${key}`}>
                  <Table.Cell>
                    <img
                      className="small-logo"
                      src={getLogo(player.currentTeam.id)}
                      alt={`imglogo${player.id}`}
                    />{" "}
                    <Link to={`${routes.player}/${player.id}`}>
                      {player.fullName} ({player.primaryPosition.abbreviation})
                    </Link>
                  </Table.Cell>
                </Table.Row>
              );
            }
            return (
              <Table.Row key={`row${key}`}>
                <Table.Cell>
                  <img
                    className="small-logo"
                    src={getLogo(player.currentTeam?.id)}
                    alt={`imglogo${player.id}`}
                  />
                  <Link to={`${routes.player}/${player.id}`}>
                    {player.fullName}
                  </Link>{" "}
                  ({player.primaryPosition.abbreviation})
                </Table.Cell>
                {displayedCategories.map((cat, i) => {
                  let value = stats[cat.name];
                  const isTopValue = value === cat.topVal;
                  countTopValues += isTopValue ? 1 : 0;
                  if (cat.name === "savePercentage") {
                    value = FormatDecimals(stats[cat.name] * 100, 1);
                  } else if (
                    [
                      "goalAgainstAverage",
                      "evenStrengthSavePercentage",
                      "powerPlaySavePercentage",
                      "shortHandedSavePercentage",
                    ].includes(cat.name)
                  ) {
                    value = FormatDecimals(stats[cat.name], 2);
                  }
                  return (
                    <Table.Cell positive={isTopValue} key={`col${i}`}>
                      {value}
                    </Table.Cell>
                  );
                })}
                <Table.Cell>
                  <Header as="h3" textAlign="center">
                    {countTopValues}
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    size="mini"
                    circular
                    onClick={() => onDelete(player.id)}
                  >
                    X
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default CompareGrid;
