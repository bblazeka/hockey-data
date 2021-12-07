import { MongoClient } from "mongodb";
import dbkey from "../keys/db.json";

export class Database {
  client: any;
  database: any;
  constructor() {
    this.client = {};
    this.database = {};
  }

  async init() {
    this.client = await MongoClient.connect(dbkey.uri, {});
    this.database = this.client.db("hockey-data");
  }

  async closeClient() {
    await this.client.close();
  }

  getCollection(name: string) {
    return this.database.collection(name);
  }
}
