const { Database } = require("../../comm/dbhandler");

var db = new Database();

function init(database) {
  db = database;
}

module.exports = {
  init
}