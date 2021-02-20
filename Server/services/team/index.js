const { Database } = require("../../comm/dbhandler");
const apicomm = require('../../comm/apihandler');
const util = require('../util/index.js');

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

  if (team != null)
  {
    team.rosterResponse = await getPlayersFromTeam(id);
    team.goalies = team.rosterResponse.filter(p => p.primaryPosition.type == "Goalie")
    team.defenders = team.rosterResponse.filter(p => p.primaryPosition.type == "Defenseman")
    team.forwards = team.rosterResponse.filter(p => p.primaryPosition.type == "Forward")
    team.description = (await apicomm.wikiApiRequest(team.name)).extract;
    team.venue.description = (await apicomm.wikiApiAdvancedRequest(team.venue.name, team.venue.city)).extract;
  }
  return team;
}

async function getTeams() {
  var teams = await db.getCollection('teams').find({}).toArray();
  return teams.filter(t => t.active).sort().sort((a, b) => (a.name > b.name) ? 1 : -1);
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

async function getTeamSchedule({id, start, end}) {
  var result = await apicomm.nhlApiRequest(`/api/v1/schedule?teamId=${id}&startDate=${start}&endDate=${end}`)
  return result
}

module.exports = {
  init,
  getTeam,
  getTeams,
  getTeamLocations,
}