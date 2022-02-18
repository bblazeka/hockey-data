import React, { useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Button, Segment, Header, Table } from "semantic-ui-react";

import { selectSelectedPlayers } from "services/selectors";

import routes from "../../../routes";
import { IsNullOrUndefined } from "../../../util/common";
import { NotFound } from "components";
import config from "../../../util/categories.json";
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
    const min = Math.min.apply(
      Math,
      players.map(function (o) {
        return o[statsMode][cat.property];
      })
    );
    const max = Math.max.apply(
      Math,
      players.map(function (o) {
        return o[statsMode][cat.property];
      })
    );
    return Object.assign(cat, {
      topVal: cat.reverse ? min : max,
      bottomVal: cat.reverse ? max : min,
    });
  });
  return displayedCategories;
}

function CompareGrid(props) {
  const { players, skater, statsSelector, onDelete } = props;
  if (IsNullOrUndefined(players)) {
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
      return cat.topVal && value === cat.topVal;
    }).length,
    customName: (
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
            link: true,
          },
          ...displayedCategories,
          { title: "score", property: "score", bold: true },
          { title: "x", property: "x", custom: true },
        ]}
        dataSource={statData}
        paintBestValues
      />
    </CompareGridSegment>
  );
}

export default CompareGrid;
