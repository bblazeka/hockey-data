import { isNil, sortBy } from "lodash";

import { Database } from "../../adapters/dbhandler";
import {
  wikiApiRequest,
  wikiApiAdvancedRequest,
} from "../../adapters/apihandler";

let db = new Database();

function init(database) {
  db = database;
}

async function getPlayersFromTeam(teamId: number) {
  const items = await db
    .getCollection("players")
    .find({ "currentTeam.id": teamId })
    .toArray();
  return items;
}

async function getTeam({ id }) {
  const collection = db.getCollection("teams");
  const query = { id: id };
  const options = {
    sort: { id: -1 },
  };
  const team = await collection.findOne(query, options);
  if (!isNil(team)) {
    const rosterResponse = await getPlayersFromTeam(id);
    team.goalies = rosterResponse.filter(
      (p) => p.primaryPosition.type == "Goalie"
    );
    team.defenders = rosterResponse.filter(
      (p) => p.primaryPosition.type == "Defenseman"
    );
    team.forwards = rosterResponse.filter(
      (p) => p.primaryPosition.type == "Forward"
    );
    team.description = (await wikiApiRequest(team.name)).extract;
    team.venue.description = (
      await wikiApiAdvancedRequest(team.venue.name, team.venue.city)
    ).extract;
  }
  return team;
}

async function getActiveTeams() {
  const teams = (await db.getCollection("teams").find({}).toArray()) as TTeam[];
  return sortBy(
    teams.filter((t) => t.active),
    "name"
  );
}

async function getTeamLocations() {
  const teams = await getActiveTeams();
  const season = await wikiApiRequest("2021–22 NHL season");
  const divisions = [
    { key: "Metropolitan", value: "red" },
    { key: "Atlantic", value: "green" },
    { key: "Central", value: "orange" },
    { key: "Pacific", value: "blue" },
  ];
  const teamLocations = teams.map((team) => {
    if (!isNil(team.division)) {
      const division = divisions.find((el) => {
        return el.key === team.division.name;
      });
      if (division != null) {
        team.location.color = division.value;
      }
    }
    team.location.text = team.name;
    team.location.id = team.id;
    return team.location;
  });
  return {
    teamLocations,
    seasonDescription: season.extract,
    divisions,
  };
}

type TTeamScheduleParams = {
  id: number;
  start: string;
  end: string;
};

async function getTeamSchedule({ id, start, end }: TTeamScheduleParams) {
  let games = await db
    .getCollection("games")
    .find({
      date: {
        $gte: `${start}`,
        $lte: `${end}`,
      },
    })
    .toArray();
  games = JSON.parse(JSON.stringify(games))
    .filter((g) => g.home.team.id === id || g.away.team.id === id)
    .map((el) => {
      el.opponent = el.home.team.id === id ? el.away : el.home;
      return el;
    });
  return games;
}

export { init, getTeam, getActiveTeams, getTeamLocations, getTeamSchedule };
