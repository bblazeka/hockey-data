var _ = require('lodash');
const common = require('common');


const { Database } = require('../../comm/dbhandler');

var db = new Database();

function init(database) {
  db = database;
}

function calculatePercentile(rank) {
  var numOfTeams = 31;
  return ((numOfTeams+1-rank)/numOfTeams)*100;
}

async function getAnalysis() {
  var teams = await db.getCollection('analysis').find({}).toArray();

  teams.forEach(function(team){ 
    var formattedRoster = team.rosterStats.filter((p)=>{ return p.stats.points > 0; }).sort((a,b)=>{ return a.stats.points - b.stats.points; }).map((p)=>{
      return Object.assign(p, {
        label: p.fullName,
        subLabel: p.stats.points,
        angle: p.stats.points
      });
    });
    Object.assign(team, {
    rankingsGraph: [
      {x: 'Wins', y: calculatePercentile(team.regularSeasonStatRankings.wins)},
      {x: 'Losses', y: calculatePercentile(team.regularSeasonStatRankings.losses)},
      {x: 'OT', y: calculatePercentile(team.regularSeasonStatRankings.ot)},
      {x: 'PTS', y: calculatePercentile(team.regularSeasonStatRankings.pts)},
      {x: 'PTS%', y: calculatePercentile(team.regularSeasonStatRankings.ptPctg)},
      {x: 'GFPG', y: calculatePercentile(team.regularSeasonStatRankings.goalsPerGame)},
      {x: 'GAPG', y: calculatePercentile(team.regularSeasonStatRankings.goalsAgainstPerGame)},
      {x: 'EGR', y: calculatePercentile(team.regularSeasonStatRankings.evGGARatio)},
      {x: 'PPGF', y: calculatePercentile(team.regularSeasonStatRankings.powerPlayGoals)},
      {x: 'PPGA', y: calculatePercentile(team.regularSeasonStatRankings.powerPlayGoalsAgainst)},
      {x: 'PPO', y: calculatePercentile(team.regularSeasonStatRankings.powerPlayOpportunities)},
      {x: 'PP%', y: calculatePercentile(team.regularSeasonStatRankings.powerPlayPercentage)},
      {x: 'PK%', y: calculatePercentile(team.regularSeasonStatRankings.penaltyKillPercentage)},
      {x: 'SFPG', y: calculatePercentile(team.regularSeasonStatRankings.shotsPerGame)},
      {x: 'SAPG', y: calculatePercentile(team.regularSeasonStatRankings.shotsAllowed)},
      {x: 'WSF', y: calculatePercentile(team.regularSeasonStatRankings.winScoreFirst)},
      {x: 'WOSF', y: calculatePercentile(team.regularSeasonStatRankings.winOppScoreFirst)},
      {x: 'WL1', y: calculatePercentile(team.regularSeasonStatRankings.winLeadFirstPer)},
      {x: 'WL2', y: calculatePercentile(team.regularSeasonStatRankings.winLeadSecondPer)},
      {x: 'WOS', y: calculatePercentile(team.regularSeasonStatRankings.winOutshootOpp)},
      {x: 'WOP', y: calculatePercentile(team.regularSeasonStatRankings.winOutshotByOpp)},
      {x: 'FO', y: calculatePercentile(team.regularSeasonStatRankings.faceOffsTaken)},
      {x: 'FOW', y: calculatePercentile(team.regularSeasonStatRankings.faceOffsWon)},
      {x: 'FOL', y: calculatePercentile(team.regularSeasonStatRankings.faceOffsLost)},
      {x: 'FO%', y: calculatePercentile(team.regularSeasonStatRankings.faceOffWinPercentage)},
      {x: 'S%', y: calculatePercentile(team.regularSeasonStatRankings.shootingPctRank)},
      {x: 'SVS%', y: calculatePercentile(team.regularSeasonStatRankings.savePctRank)},
    ],
    stats: [
      {title: 'W', value: team.statsSingleSeason.wins, description: 'Wins'},
      {title: 'L', value: team.statsSingleSeason.losses, description: 'Losses'},
      {title: 'OT', value: team.statsSingleSeason.ot, description: 'Overtime losses'},
      {title: 'PTS', value: team.statsSingleSeason.pts, description: 'Points'},
      {title: 'PTS%', value: team.statsSingleSeason.ptPctg, description: 'Point percentage'},
      {title: 'GFPG', value: team.statsSingleSeason.goalsPerGame, description: 'Goals for per game'},
      {title: 'GAPG', value: team.statsSingleSeason.goalsAgainstPerGame, description: 'Goals against per game'},
      {title: 'EGR', value: common.FormatDecimals(team.statsSingleSeason.evGGARatio, 2), description: 'Even strength goals / goals against ratio'},
      {title: 'PPGF', value: team.statsSingleSeason.powerPlayGoals, description: 'Power play goals for'},
      {title: 'PPGA', value: team.statsSingleSeason.powerPlayGoalsAgainst, description: 'Power play goals against'},
      {title: 'PPO', value: team.statsSingleSeason.powerPlayOpportunities, description: 'Power play opportunities'},
      {title: 'PP%', value: team.statsSingleSeason.powerPlayPercentage, description: 'Power play percentage'},
      {title: 'PK%', value: team.statsSingleSeason.penaltyKillPercentage, description: 'Penalty kill percentage'},
      {title: 'SFPG', value: common.FormatDecimals(team.statsSingleSeason.shotsPerGame, 2), description: 'Shots on goal per game'},
      {title: 'SAPG', value: common.FormatDecimals(team.statsSingleSeason.shotsAllowed, 2), description: 'Shots on goal allowed per game'},
      {title: 'WSF', value: team.statsSingleSeason.winScoreFirst, description: 'Wins score first'},
      {title: 'WOSF', value: team.statsSingleSeason.winOppScoreFirst, description: 'Wins opponent scores first'},
      {title: 'WL1', value: team.statsSingleSeason.winLeadFirstPer, description: 'Wins after leading in 1st period'},
      {title: 'WL2', value: team.statsSingleSeason.winLeadSecondPer, description: 'Wins after leading in 2nd period'},
      {title: 'WOS', value: team.statsSingleSeason.winOutshootOpp, description: 'Wins after outshooting the opposition'},
      {title: 'WOP', value: team.statsSingleSeason.winOutshotByOpp, description: 'Wins after being outshot by opponent'},
      {title: 'FO', value: team.statsSingleSeason.faceOffsTaken, description: 'Faceoffs taken'},
      {title: 'FOW', value: team.statsSingleSeason.faceOffsWon, description: 'Faceoffs won'},
      {title: 'FOL', value: team.statsSingleSeason.faceOffsLost, description: 'Faceoffs lost'},
      {title: 'FO%', value: team.statsSingleSeason.faceOffWinPercentage, description: 'Faceoff win percentage'},
      {title: 'S%', value: team.statsSingleSeason.shootingPctg, description: 'Shooting percentage'},
      {title: 'SVS%', value: team.statsSingleSeason.savePctg, description: 'Saves percentage'},
    ],
    rosterStats: formattedRoster
  }); });
  return _.sortBy(teams, 'leagueRank');
}

module.exports = {
  init,
  getAnalysis,
};