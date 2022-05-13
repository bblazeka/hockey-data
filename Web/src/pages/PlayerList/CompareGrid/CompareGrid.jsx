import React, { useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Segment, Header, Table } from "semantic-ui-react";

import { selectSelectedPlayers } from "reducers/selectors";

import routes from "../../../routes";
import { NotFound } from "components";
import config from "util/categories.json";
import StatsRadarChart from "./StatsRadarChart";
import SortableTable from "components/SortableTable";

const CompareGridSegment = styled(Segment)`
  padding: 8px;
`;

function displayedProperties(players, exampleObject, statsMode, skater) {
  const displayableCategories = skater
    ? config.skaterCategories
    : config.goalieCategories;
  const displayedCategories = Object.values(displayableCategories).filter(
    (key) => key.property in exampleObject
  );
  displayedCategories.forEach((cat) => {
    const categoryValues = players.map((o) => o[statsMode][cat.property]);
    const min = Math.min.apply(Math, categoryValues);
    const minValue = cat.decimal ? min.toFixed(2) : min;
    const max = Math.max.apply(Math, categoryValues);
    const maxValue = cat.decimal ? max.toFixed(2) : max;
    return Object.assign(cat, {
      topVal: cat.reverse ? minValue : maxValue,
      bottomVal: cat.reverse ? maxValue : minValue,
    });
  });
  return displayedCategories;
}

function CompareGrid({ players, skater, statsSelector, onDelete }) {
  if (!players) {
    return <NotFound />;
  }

  const { loading } = useSelector(selectSelectedPlayers);

  const statsMode = statsSelector || "stats";

  const exampleObject = players.length > 0 ? players[0][statsMode] : {};

  const displayedCategories = useMemo(
    () => displayedProperties(players, exampleObject, statsMode, skater),
    [players, exampleObject, statsMode, skater]
  );

  const playerNames = players.map((p) => p.fullName);

  const statData = players.map((p) => ({
    ...p[statsMode],
    fullName: p.fullName,
    id: p.id,
    link: `${routes.player}/${p.id}`,
    score: displayedCategories.filter((cat) => {
      const value = p[statsMode][cat.property];
      return (
        cat.topVal && (cat.decimal ? value.toFixed(2) : value) === cat.topVal
      );
    }).length,
    customName: (
      <Table.Cell key={`nameCell${p.id}`}>
        <Link to={`${routes.player}/${p.id}`}>
          <Header as="h4">
            {p.fullName}
            <Header.Subheader>{p.currentTeam.name}</Header.Subheader>
          </Header>
        </Link>
      </Table.Cell>
    ),
    customOptions: (
      <Table.Cell key={`cancelCell${p.id}`}>
        <Button size="mini" circular onClick={() => onDelete(p.id)}>
          X
        </Button>
      </Table.Cell>
    ),
  }));

  return (
    <CompareGridSegment basic loading={loading}>
      <Header as="h4">{skater ? "Skaters" : "Goalies"}</Header>
      <StatsRadarChart
        {...{ players, displayedCategories, playerNames, statsMode }}
      />
      <SortableTable
        columnNames={[
          {
            title: "Player",
            property: "fullName",
            customName: true,
          },
          ...displayedCategories,
          { title: "score", property: "score", bold: true },
          { title: "", property: "x", customOptions: true, notSortable: true },
        ]}
        dataSource={statData}
        paintBestValues
      />
    </CompareGridSegment>
  );
}

export default CompareGrid;
