import { analysisSchema } from "./schemas/analysis";
import { querySchema } from "./schemas/query";
import { gameSchema } from "./schemas/game";
import { leagueSchema } from "./schemas/league";
import { miscSchema } from "./schemas/misc";
import { playerSchema } from "./schemas/player";
import { teamSchema } from "./schemas/team";

export function getTypeDefs() {
  return [
    analysisSchema,
    querySchema,
    gameSchema,
    leagueSchema,
    miscSchema,
    playerSchema,
    teamSchema,
  ];
}
