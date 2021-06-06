var _ = require('lodash');

const { Database } = require('../../comm/dbhandler');
const apicomm = require('../../comm/apihandler');
const util = require('../util/index.js');

var db = new Database();

function init(database)
{
  db = database;
}

async function getPlayersFromTeam(teamId) {
  const items = await db.getCollection('players').find({ 'currentTeam.id': teamId }).toArray();
  return items;
}

async function getTeamRosterStats(teamId) {
  const stats = await db.getCollection('analysis').findOne({ 'team.id': teamId });
  return stats.rosterStats;
}

async function getTeam({id}) {
  const collection = db.getCollection('teams');
  const query = { id: id };
  const options = {
    sort: { id: -1 },
  };
  const team = await collection.findOne(query, options);

  if (!_.isNil(team))
  {

    var rosterResponse = await getPlayersFromTeam(id);
    var rosterStats = await getTeamRosterStats(id);
    team.goalies = rosterResponse.filter(p => p.primaryPosition.type == 'Goalie');
    team.defenders = rosterResponse.filter(p => p.primaryPosition.type == 'Defenseman');
    team.forwards = rosterResponse.filter(p => p.primaryPosition.type == 'Forward');
    team.rosterStats = rosterStats;
    team.description = (await apicomm.wikiApiRequest(team.name)).extract;
    team.venue.description = (await apicomm.wikiApiAdvancedRequest(team.venue.name, team.venue.city)).extract;
  }

  return team;
}

async function getTeams() {
  var teams = await db.getCollection('teams').find({}).toArray();
  return _.sortBy(teams.filter(t => t.active), 'name');
}

async function getTeamLocations() {
  var teams = await getTeams();
  var season = await apicomm.wikiApiRequest('2020–21 NHL season');
  var divisions = [{ key: 'Scotia North', value: 'red'}, 
  { key: 'MassMutual East', value: 'green'}, 
  { key: 'Discover Central', value: 'orange'}, 
  { key: 'Honda West', value: 'blue'}];
  var teamLocations = teams.map((team) => {
    if (!_.isNil(team.division)) {
      var division = divisions.find((el)=>{ return el.key === team.division.name;});
      if (division != null)
      {
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
    divisions
  };
}

async function getTeamSchedule({ id, start, end }) {
  var games = await db.getCollection('games').find({
    'date': {
      $gte: `${start}`,
      $lte: `${end}`
    }
  }).toArray();
  games = JSON.parse(JSON.stringify(games)).filter(g => g.home.team.id === id || g.away.team.id === id).map(el => {
    el.opponent = (el.home.team.id === id) ? el.away : el.home;
    return el;
  });
  return games;
}

module.exports = {
  init,
  getTeam,
  getTeams,
  getTeamLocations,
  getTeamSchedule,
};