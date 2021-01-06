const { Database } = require("../../comm/dbhandler");

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
    projection: { _id: 0, id: 1, name: 1, abbreviation: 1 },
  };
  const team = await collection.findOne(query, options);

  if (team != null)
  {
    team.rosterResponse = await getPlayersFromTeam(id);
    team.goalies = team.rosterResponse.filter(p => p.primaryPosition.type == "Goalie")
    team.defenders = team.rosterResponse.filter(p => p.primaryPosition.type == "Defenseman")
    team.forwards = team.rosterResponse.filter(p => p.primaryPosition.type == "Forward")
  }
  return team;
}

async function getTeams() {
  var teams = await db.getCollection('teams').find({}).toArray();
  return teams.filter(t => t.active).sort().sort((a, b) => (a.name > b.name) ? 1 : -1);
}

async function getTeamSchedule({id, start, end}) {
  var result = await apicomm.nhlApiRequest(`/api/v1/schedule?teamId=${id}&startDate=${start}&endDate=${end}`)
  return result
}

module.exports = {
  init,
  getTeam,
  getTeams,
}