import React from "react";
import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import "./Schedule.scss";
import routes from "routes";
import { DateToServerFormat } from "util/common";
import { getLogo } from "util/assets";

export default function ScheduleTable({ schedule, dates }) {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Team</Table.HeaderCell>
          {dates.map((date) => {
            return (
              <Table.HeaderCell key={`date${date}`}>
                {dayjs(DateToServerFormat(date)).format("DD.MM.")}
              </Table.HeaderCell>
            );
          })}
          <Table.HeaderCell>Games</Table.HeaderCell>
          <Table.HeaderCell>Score</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {schedule.map((element) => {
          return (
            <Table.Row key={`games ${element.id}`}>
              <Table.Cell key={`logo ${element.id}`}>
                <Link to={`${routes.teams}/${element.id}`}>
                  <img
                    className="logo"
                    src={getLogo(element.id)}
                    alt={`img${element.id}`}
                  ></img>
                </Link>
              </Table.Cell>
              {dates.map((date) => {
                const game = element.games.filter(
                  (game) => game.date && game.date === DateToServerFormat(date)
                )[0];
                try {
                  const logo = getLogo(game.opponent.team.id);
                  return (
                    <Table.Cell
                      key={`opp ${element.id}${game.date}`}
                      className={
                        element.id === game.home.team.id
                          ? "home-game"
                          : "away-game"
                      }
                    >
                      <img
                        className="logo"
                        src={logo}
                        alt={`img${game.gameDate}${element.id}`}
                      ></img>
                      <div className="matchup-info">
                        {game.opponent.leagueRecord.wins}-
                        {game.opponent.leagueRecord.losses}-
                        {game.opponent.leagueRecord.ot}
                        <br />
                        {game.opponent.rating}
                      </div>
                    </Table.Cell>
                  );
                } catch (err) {
                  return (
                    <Table.Cell
                      key={`empty ${element.id}${date.toString()}`}
                    ></Table.Cell>
                  );
                }
              })}
              <td className="emphasized-letter">{element.games.length}</td>
              <td>
                <div className="matchup-info">
                  {element.scheduleScore}
                  <br />
                  {element.avgScheduleScore}
                </div>
              </td>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

ScheduleTable.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.object),
  schedule: PropTypes.arrayOf(PropTypes.object),
};
