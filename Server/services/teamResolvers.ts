import { isNil, sortBy } from "lodash";
import { wikiApiRequest } from "adapters/apihandler";
import { Database, TDbPlayer, TDbTeam } from "adapters/dbhandler";
import { EDatabaseCollection } from "utils/enums";

let db = new Database();

function init(database: Database) {
  db = database;
}

async function getPlayersFromTeam(teamId: number): Promise<TDbPlayer[]> {
  const items = await db
    .getCollection(EDatabaseCollection.players)
    .find({ "currentTeam.id": teamId })
    .toArray() as TDbPlayer[];
  return items;
}

type TGetTeamParams = {
  id: number;
}

async function getTeam({ id }: TGetTeamParams): Promise<TDbTeam> {
  const collection = db.getCollection(EDatabaseCollection.teams);
  const team = (await collection.findOne({ id })) as TDbTeam;
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
  }
  return team;
}

async function getActiveTeams(): Promise<TDbTeam[]> {
  const teams = (await db
    .getCollection(EDatabaseCollection.teams)
    .find({})
    .toArray()) as TDbTeam[];
  return sortBy(
    teams.filter((t) => t.active),
    "name"
  );
}

type TTeamScheduleParams = {
  id: number;
  start: string;
  end: string;
};

async function getTeamSchedule({ id, start, end }: TTeamScheduleParams) {
  let games = await db
    .getCollection(EDatabaseCollection.games)
    .find({
      date: {
        $gte: `${start}`,
        $lte: `${end}`,
      },
    })
    .toArray();
  games = JSON.parse(JSON.stringify(games))
    .filter((g) => g.home.team.id === id || g.away.team.id === id)
    .map((el) => ({
      ...el,
      opponent: el.home.team.id === id ? el.away : el.home,
    }));
  return games;
}

export { init, getTeam, getActiveTeams, getTeamSchedule };
