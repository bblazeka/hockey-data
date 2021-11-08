import { analysisSchema } from "./schemas/analysis";
import { querySchema } from "./schemas/query";
import { gameSchema } from "./schemas/game";
import { leagueSchema } from "./schemas/league";
import { newsSchema } from "./schemas/news";
import { playerSchema } from "./schemas/player";
import { teamSchema } from "./schemas/team";
import { utilSchema } from "./schemas/util";

export function getTypeDefs() {
  return [
    analysisSchema,
    querySchema,
    gameSchema,
    leagueSchema,
    newsSchema,
    playerSchema,
    teamSchema,
    utilSchema,
  ];
}
