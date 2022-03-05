import { round, sortBy } from "lodash";

import { Database } from "../adapters/dbhandler";
import { getActiveTeams } from "./teamResolvers";

let db = new Database();

function init(database) {
  db = database;
}

async function getAnalysis() {
  const activeTeams = await getActiveTeams();
  const teams: TTeamAnalysis[] = await db
    .getCollection("analysis")
    .find({})
    .toArray();

  teams.forEach(function (team) {
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
  });
  return sortBy(teams, "leagueRank");
}

async function getTeamAnalysis({ teamId }) {
  const activeTeams = await getActiveTeams();
  const team: TTeamAnalysis = (
    await db.getCollection("analysis").find({ id: teamId }).toArray()
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
