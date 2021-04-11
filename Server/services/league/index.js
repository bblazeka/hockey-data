var _ = require('lodash');

const { Database } = require('../../comm/dbhandler');
const apicomm = require('../../comm/apihandler');

var db = new Database();

function init(database) {
  db = database;
}

function calculateGameScore(opponent)
{
  var totalGames = opponent.leagueRecord.wins + opponent.leagueRecord.ot + opponent.leagueRecord.losses;
  return (opponent.leagueRecord.wins*2 + opponent.leagueRecord.ot) / (2*totalGames);
}

async function getStandings({ season }) {
  var records = await apicomm.nhlApiRequest(`/api/v1/standings?season=${season}`);
  return records.records;
}

async function getSchedule({ start, end }) {
  var teams = await (await db.getCollection('teams').find({ 'active': true }).toArray());
  var sortedTeams = _.sortBy(teams, ['name']);
  
  var games = await db.getCollection('games').find({
    'date': {
      $gte: `${start}`,
      $lte: `${end}`
    }
  }).toArray();
  for (let team of sortedTeams) {
    team.scheduleScore = 0;
    team.games = JSON.parse(JSON.stringify(games)).filter(g => g.home.team.id === team.id || g.away.team.id === team.id).map(el => {
      el.opponent = (el.home.team.id === team.id) ? el.away : el.home;
      var score = calculateGameScore(el.opponent);
      el.opponent.rating = Math.round((score + Number.EPSILON) * 100) / 100;
      team.scheduleScore += score;
      return el;
    });
    team.scheduleScore = Math.round((team.scheduleScore + Number.EPSILON) * 100) / 100;
    team.avgScheduleScore = Math.round((team.scheduleScore / team.games.length + Number.EPSILON) * 100) / 100;
  }
  return sortedTeams;
}

module.exports = {
  init,
  getSchedule,
  getStandings,
};