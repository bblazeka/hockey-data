import { ApolloServer } from "apollo-server";

import * as analysis from "./services/analysis";
import * as game from "./services/game";
import * as team from "./services/team";
import * as league from "./services/league";
import * as player from "./services/player";

import { Database } from "./adapters/dbhandler";
import { getTypeDefs } from "./typeDefs";
import { getResolvers } from "./resolvers";

const server = new ApolloServer({
  typeDefs: getTypeDefs(),
  resolvers: getResolvers(),
});

let databaseInitialized = false;

async function init() {
  console.log("Initializing database...");

  if (!databaseInitialized) {
    const database = new Database();
    await database.init();
    analysis.init(database);
    game.init(database);
    team.init(database);
    player.init(database);
    league.init(database);

    databaseInitialized = true;
  }
}

// The `listen` method launches a web server.
server.listen().then(async ({ url }) => {
  await init();
  console.log(`🚀  Server ready at ${url}`);
});
