import React from "react";
import { Link } from "react-router-dom";
import { Header, Table } from "semantic-ui-react";
import PropTypes from "prop-types";

import { Loader, NotFound } from "components";

import "./RosterStatsGrid.scss";
import config from "util/config.json";
import routes from "../../../routes";
import { FormatDecimals, IsNullOrUndefined } from "util/common";

function RosterStatsGrid({ rosterStats, title }) {
  if (IsNullOrUndefined(rosterStats)) {
    return <Loader text="Loading roster stats..."></Loader>;
  }
  if (rosterStats.length === 0) {
    return <NotFound text={title + " - " + "Stats not found."}></NotFound>;
  }
  const exampleObject = rosterStats[0].stats;
  const displayedCategories = config.categories.filter((cat) => {
    return cat.name in exampleObject;
  });
  return (
    <div className="roster-stats">
      <Header as="h4">{title}</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            {displayedCategories.map((cat, index) => {
              return (
                <Table.HeaderCell key={"headercol" + index}>
                  {cat.abbr}
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rosterStats.map((stat, index) => {
            return (
              <Table.Row key={stat + index}>
                <Table.Cell className="name-cell">
                  <Link to={`${routes.player}/${stat.id}`}>
                    {stat.fullName}
                  </Link>
                </Table.Cell>
                {displayedCategories.map((cat, i) => {
                  let value = stat.stats[cat.name];
                  if (cat.name === "savePercentage") {
                    value = FormatDecimals(value * 100, 1);
                  } else if (
                    [
                      "goalAgainstAverage",
                      "evenStrengthSavePercentage",
                      "powerPlaySavePercentage",
                      "shortHandedSavePercentage",
                    ].includes(cat.name)
                  ) {
                    value = FormatDecimals(value, 2);
                  }
                  return <Table.Cell key={"col" + i}>{value}</Table.Cell>;
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

RosterStatsGrid.PropTypes = {
  rosterStats: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default RosterStatsGrid;
