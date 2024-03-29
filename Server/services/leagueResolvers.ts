import { sortBy, uniqBy } from "lodash";
import { nhlApiRequest } from "../adapters/apihandler";

import { Database, TDbTeam } from "adapters/dbhandler";
import * as team from "./teamResolvers";
import { calculateGameScore, mapApiDivision } from "./leagueFunctions";
import { EDatabaseCollection } from "utils/enums";

let db = new Database();

function init(database: Database) {
  db = database;
}

type TGetScheduleParams = {
  start: string;
  end: string;
};

async function getSchedule({ start, end }: TGetScheduleParams) {
  const teams = await team.getActiveTeams();
  const sortedTeams = sortBy(teams, ["name"]);

  const games = await db
    .getCollection(EDatabaseCollection.games)
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
        const teamScore = calculateGameScore(
          el.home.team.id === team.id ? el.home : el.away
        );

        el.opponent = el.home.team.id === team.id ? el.away : el.home;
        const score = calculateGameScore(el.opponent);
        const gameScore = teamScore - score;
        el.opponent.rating =
          Math.round((gameScore + Number.EPSILON) * 100) / 100;
        team.scheduleScore += gameScore;
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
  const teams = (await team.getActiveTeams()) as TDbTeam[];

  const divisions = teams.map((i) => i.division);
  const uniqueDivisions = uniqBy(divisions, "id") as TApiDivision[];
  const divisionsWithTeams = uniqueDivisions.map(mapApiDivision);

  teams.forEach((t) => {
    divisionsWithTeams
      .find((div) => div.name === t.division.name)
      .teams.push(t);
  });
  return divisionsWithTeams;
}

export { init, getSchedule, divisionsWithTeams };
