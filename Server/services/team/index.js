var _ = require('lodash');

const { Database } = require("../../comm/dbhandler");
const apicomm = require('../../comm/apihandler');
const util = require('../util/index.js');
const common = require('common');
const scrapping = require('../../comm/scrapinghandler');

var db = new Database();

function init(database)
{
  db = database;
}

async function getPlayersFromTeam(teamId) {
  const items = await db.getCollection('players').find({ "currentTeam.id": teamId }).toArray();
  return items;
}

async function getTeam({id}) {
  const collection = db.getCollection('teams');
  const query = { id: id };
  const options = {
    sort: { id: -1 },
  };
  const team = await collection.findOne(query, options);

  if (!common.IsNullOrUndefined(team))
  {
    team.rosterResponse = await getPlayersFromTeam(id);
    team.goalies = team.rosterResponse.filter(p => p.primaryPosition.type == "Goalie")
    team.defenders = team.rosterResponse.filter(p => p.primaryPosition.type == "Defenseman")
    team.forwards = team.rosterResponse.filter(p => p.primaryPosition.type == "Forward")
    team.description = (await apicomm.wikiApiRequest(team.name)).extract;
    team.venue.description = (await apicomm.wikiApiAdvancedRequest(team.venue.name, team.venue.city)).extract;
  }

  team.lines = scrapping.scrapLines(team.name);
  return team;
}

async function getTeams() {
  var teams = await db.getCollection('teams').find({}).toArray();
  return _.sortBy(teams.filter(t => t.active), 'name');
}

async function getTeamLocations() {
  var teams = await getTeams();
  var response = await teams.map(async (team) => {
    var location = await util.geocode({query:`${team.venue.name} ${team.venue.city}`});
    switch(team.division.name) {
      case 'Scotia North':
        location[0].color = 'red';
        break;
      case 'MassMutual East':
        location[0].color = 'green';
        break;
      case 'Discover Central':
        location[0].color = 'orange';
        break;
      case 'Honda West':
        location[0].color = 'blue';
        break;
    }
    location[0].text = team.name;
    location[0].id = team.id;
    return location[0];
  });
  return response;
}

async function getTeamSchedule({ id, start, end }) {
  var games = await db.getCollection('games').find({
    "date": {
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
}