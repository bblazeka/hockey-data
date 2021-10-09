import { sortBy, uniqBy } from "lodash";

import { Database } from "../../comm/dbhandler";
import apicomm from "../../comm/apihandler";
import * as team from "../team";

let db = new Database();

function init(database) {
  db = database;
}

function calculateGameScore(opponent) {
  const totalGames =
    opponent.leagueRecord.wins +
    opponent.leagueRecord.ot +
    opponent.leagueRecord.losses;
  return (
    (opponent.leagueRecord.wins * 2 + opponent.leagueRecord.ot) /
    (2 * totalGames)
  );
}

async function getStandings({ season }) {
  const records = await apicomm.nhlApiRequest(
    `/api/v1/standings?season=${season}`
  );
  return records.records;
}

async function getSchedule({ start, end }) {
  const teams = await team.getActiveTeams();
  const sortedTeams = sortBy(teams, ["name"]);

  const games = await db
    .getCollection("games")
    .find({
      date: {
        $gte: `${start}`,
        $lte: `${end}`,
      },
      gameType: "R",
    })
    .toArray();
  for (let team of sortedTeams) {
    team.scheduleScore = 0;
    team.games = JSON.parse(JSON.stringify(games))
      .filter((g) => g.home.team.id === team.id || g.away.team.id === team.id)
      .map((el) => {
        el.opponent = el.home.team.id === team.id ? el.away : el.home;
        const score = calculateGameScore(el.opponent);
        el.opponent.rating = Math.round((score + Number.EPSILON) * 100) / 100;
        team.scheduleScore += score;
        return el;
      });
    team.scheduleScore =
      Math.round((team.scheduleScore + Number.EPSILON) * 100) / 100;
    team.avgScheduleScore =
      Math.round(
        (team.scheduleScore / team.games.length + Number.EPSILON) * 100
      ) / 100;
  }
  return sortedTeams;
}

async function divisionsWithTeams() {
  const teams = await team.getActiveTeams();

  const divisions = teams.map((i) => i.division);
  const uniqueDivisions = uniqBy(divisions, "id");
  const divisionExtended = uniqueDivisions.map((d) => {
    return Object.assign(d, { teams: [] });
  });

  teams.forEach((t) => {
    divisionExtended.find((div) => div.name === t.division.name).teams.push(t);
  });
  return divisionExtended;
}

export { init, getSchedule, getStandings, divisionsWithTeams };
