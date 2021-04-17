var _ = require('lodash');

const { Database } = require('../../comm/dbhandler');

var db = new Database();

function init(database) {
  db = database;
}

async function getAnalysis() {
  var teams = await db.getCollection('analysis').find({}).toArray();
  return _.sortBy(teams, 'team.name');
}

module.exports = {
  init,
  getAnalysis,
};