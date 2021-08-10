const _ = require('lodash');


const { Database } = require('../../comm/dbhandler');
const { getActiveTeams } = require('../team/resolvers');

let db = new Database();

function init(database) {
  db = database;
}

async function getAnalysis() {
  const activeTeams = await getActiveTeams();
  const teams = await db.getCollection('analysis').find({}).toArray();

  teams.forEach(function (team) {
    team.team = activeTeams.filter(t => t.id === team.team.id)[0];
    const formattedRoster = team.rosterStats.map((p) => {
      return Object.assign(p, {
        stats: p.stats
      });
    });
    Object.assign(team, {
      rankingsGraph: [
        { x: 'Wins', y: (team.regularSeasonStatRankings.wins) },
        { x: 'Losses', y: (team.regularSeasonStatRankings.losses) },
        { x: 'OT', y: (team.regularSeasonStatRankings.ot) },
        { x: 'PTS', y: (team.regularSeasonStatRankings.pts) },
        { x: 'PTS%', y: (team.regularSeasonStatRankings.ptPctg) },
        { x: 'GFPG', y: (team.regularSeasonStatRankings.goalsPerGame) },
        { x: 'GAPG', y: (team.regularSeasonStatRankings.goalsAgainstPerGame) },
        { x: 'EGR', y: (team.regularSeasonStatRankings.evGGARatio) },
        { x: 'PPGF', y: (team.regularSeasonStatRankings.powerPlayGoals) },
        { x: 'PPGA', y: (team.regularSeasonStatRankings.powerPlayGoalsAgainst) },
        { x: 'PPO', y: (team.regularSeasonStatRankings.powerPlayOpportunities) },
        { x: 'PP%', y: (team.regularSeasonStatRankings.powerPlayPercentage) },
        { x: 'PK%', y: (team.regularSeasonStatRankings.penaltyKillPercentage) },
        { x: 'SFPG', y: (team.regularSeasonStatRankings.shotsPerGame) },
        { x: 'SAPG', y: (team.regularSeasonStatRankings.shotsAllowed) },
        { x: 'WSF', y: (team.regularSeasonStatRankings.winScoreFirst) },
        { x: 'WOSF', y: (team.regularSeasonStatRankings.winOppScoreFirst) },
        { x: 'WL1', y: (team.regularSeasonStatRankings.winLeadFirstPer) },
        { x: 'WL2', y: (team.regularSeasonStatRankings.winLeadSecondPer) },
        { x: 'WOS', y: (team.regularSeasonStatRankings.winOutshootOpp) },
        { x: 'WOP', y: (team.regularSeasonStatRankings.winOutshotByOpp) },
        { x: 'FO', y: (team.regularSeasonStatRankings.faceOffsTaken) },
        { x: 'FOW', y: (team.regularSeasonStatRankings.faceOffsWon) },
        { x: 'FOL', y: (team.regularSeasonStatRankings.faceOffsLost) },
        { x: 'FO%', y: (team.regularSeasonStatRankings.faceOffWinPercentage) },
        { x: 'S%', y: (team.regularSeasonStatRankings.shootingPctRank) },
        { x: 'SVS%', y: (team.regularSeasonStatRankings.savePctRank) },
      ],
      stats: [
        { title: 'W', value: team.statsSingleSeason.wins, description: 'Wins' },
        { title: 'L', value: team.statsSingleSeason.losses, description: 'Losses' },
        { title: 'OT', value: team.statsSingleSeason.ot, description: 'Overtime losses' },
        { title: 'PTS', value: team.statsSingleSeason.pts, description: 'Points' },
        { title: 'PTS%', value: team.statsSingleSeason.ptPctg, description: 'Point percentage' },
        { title: 'GFPG', value: team.statsSingleSeason.goalsPerGame, description: 'Goals for per game' },
        { title: 'GAPG', value: team.statsSingleSeason.goalsAgainstPerGame, description: 'Goals against per game' },
        { title: 'EGR', value: _.round((team.statsSingleSeason.evGGARatio), 2), description: 'Even strength goals / goals against ratio' },
        { title: 'PPGF', value: team.statsSingleSeason.powerPlayGoals, description: 'Power play goals for' },
        { title: 'PPGA', value: team.statsSingleSeason.powerPlayGoalsAgainst, description: 'Power play goals against' },
        { title: 'PPO', value: team.statsSingleSeason.powerPlayOpportunities, description: 'Power play opportunities' },
        { title: 'PP%', value: team.statsSingleSeason.powerPlayPercentage, description: 'Power play percentage' },
        { title: 'PK%', value: team.statsSingleSeason.penaltyKillPercentage, description: 'Penalty kill percentage' },
        { title: 'SFPG', value: _.round((team.statsSingleSeason.shotsPerGame), 2), description: 'Shots on goal per game' },
        { title: 'SAPG', value: _.round((team.statsSingleSeason.shotsAllowed), 2), description: 'Shots on goal allowed per game' },
        { title: 'WSF', value: team.statsSingleSeason.winScoreFirst, description: 'Wins score first' },
        { title: 'WOSF', value: team.statsSingleSeason.winOppScoreFirst, description: 'Wins opponent scores first' },
        { title: 'WL1', value: team.statsSingleSeason.winLeadFirstPer, description: 'Wins after leading in 1st period' },
        { title: 'WL2', value: team.statsSingleSeason.winLeadSecondPer, description: 'Wins after leading in 2nd period' },
        { title: 'WOS', value: team.statsSingleSeason.winOutshootOpp, description: 'Wins after outshooting the opposition' },
        { title: 'WOP', value: team.statsSingleSeason.winOutshotByOpp, description: 'Wins after being outshot by opponent' },
        { title: 'FO', value: team.statsSingleSeason.faceOffsTaken, description: 'Faceoffs taken' },
        { title: 'FOW', value: team.statsSingleSeason.faceOffsWon, description: 'Faceoffs won' },
        { title: 'FOL', value: team.statsSingleSeason.faceOffsLost, description: 'Faceoffs lost' },
        { title: 'FO%', value: team.statsSingleSeason.faceOffWinPercentage, description: 'Faceoff win percentage' },
        { title: 'S%', value: team.statsSingleSeason.shootingPctg, description: 'Shooting percentage' },
        { title: 'SVS%', value: team.statsSingleSeason.savePctg, description: 'Saves percentage' },
      ],
      rosterStats: formattedRoster
    });
  });
  return _.sortBy(teams, 'leagueRank');
}

module.exports = {
  init,
  getAnalysis,
};