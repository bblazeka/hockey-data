const { MongoClient } = require("mongodb");
var dbkey = require('../keys/db.json');

class Database {

  constructor() {
    this.client = {};
    this.database = {};
  }

  async init() {
    this.client = await MongoClient.connect(dbkey.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.database = this.client.db("hockey-data");
  }

  async closeClient() {
    await this.client.close();
  }

  getCollection (name) {
    return this.database.collection(name);
  }
}
module.exports = {
  Database
}