import { Db, Document, MongoClient, WithId } from "mongodb";
import dbkey from "keys/db.json";

export interface TDbTeam extends WithId<Document>, TTeam {}
export interface TDbPlayer extends WithId<Document>, TPlayer {}

export class Database {
  client: MongoClient | undefined;
  database: Db | undefined;
  constructor() {
    this.client = undefined;
    this.database = undefined;
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
