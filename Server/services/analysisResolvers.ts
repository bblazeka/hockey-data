import { Database } from "adapters/dbhandler";
import { getActiveTeams } from "./teamResolvers";
import { EDatabaseCollection } from "utils/enums";

let db = new Database();

function init(database: Database) {
  db = database;
}

async function getAnalysis() {
  const teams = await db
    .getCollection(EDatabaseCollection.analysis)
    .find({})
    .project({ rosterStats: 0, lines: 0})
    .sort({ leagueRank: 1})
    .toArray();
  return teams;
}

type TGetTeamAnalysisParams = {
  teamId: string;
};

async function getTeamAnalysis({ teamId }: TGetTeamAnalysisParams) {
  const activeTeams = await getActiveTeams();
  const team = (
    await db
      .getCollection(EDatabaseCollection.analysis)
      .find({ id: teamId })
      .toArray()
  )[0];

  team.team = activeTeams.filter((t) => t.id === team.team.id)[0];
  const formattedRoster = team.rosterStats.map((p) => ({
    ...p,
    stats: p.stats,
    advancedStats: p.advancedStats,
  }));
  team.skaterStats = team.rosterStats?.filter((s) => s.stats.shifts) ?? [];
  team.skaterStats.sort((p1, p2) => p2.stats.points - p1.stats.points);
  team.goalieStats = team.rosterStats?.filter((s) => s.stats.saves) ?? [];
  team.goalieStats.sort((p1, p2) => p2.stats.wins - p1.stats.wins);
  Object.assign(team, {
    rosterStats: formattedRoster,
  });
  return team;
}

export { init, getAnalysis, getTeamAnalysis };
