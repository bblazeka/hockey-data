import React from "react";
import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import styled from "styled-components";

import routes from "routes";
import { LogoStyled } from "components/collection";
import { DateToServerFormat } from "util/common";
import { getLogo } from "util/assets";

const ScoreSpan = styled.span`
  ${({ negative }) => negative && `color: red;`}
`;

const MatchupInfo = styled.div`
  display: inline-block;
`;

const GameCell = styled(Table.Cell)`
  background-color: lightblue;
  ${({ homeGame }) => homeGame && `background-color: turquoise;`}
`;

const GameCountCell = styled.td`
  font-weight: bold;
  font-size: xx-large;
`;

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
                  <LogoStyled
                    src={getLogo(element.id)}
                    alt={`img${element.id}`}
                  />
                </Link>
              </Table.Cell>
              {dates.map((date) => {
                const game = element.games.filter(
                  (game) => game.date && game.date === DateToServerFormat(date)
                )[0];
                try {
                  const logo = getLogo(game.opponent.team.id);
                  return (
                    <GameCell
                      key={`opp ${element.id}${game.date}`}
                      homeGame={element.id === game.home.team.id}
                    >
                      <LogoStyled
                        src={logo}
                        alt={`img${game.gameDate}${element.id}`}
                      ></LogoStyled>
                      <MatchupInfo>
                        {game.opponent.leagueRecord.wins}-
                        {game.opponent.leagueRecord.losses}-
                        {game.opponent.leagueRecord.ot}
                        <br />
                        <ScoreSpan negative={game.opponent.rating < 0}>
                          {game.opponent.rating}
                        </ScoreSpan>
                      </MatchupInfo>
                    </GameCell>
                  );
                } catch (err) {
                  return (
                    <Table.Cell
                      key={`empty ${element.id}${date.toString()}`}
                    ></Table.Cell>
                  );
                }
              })}
              <GameCountCell>{element.games.length}</GameCountCell>
              <td>
                <MatchupInfo>
                  <ScoreSpan negative={element.scheduleScore < 0}>
                    {element.scheduleScore}
                  </ScoreSpan>
                  <br />
                  <ScoreSpan negative={element.avgScheduleScore < 0}>
                    {element.avgScheduleScore}
                  </ScoreSpan>
                </MatchupInfo>
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
