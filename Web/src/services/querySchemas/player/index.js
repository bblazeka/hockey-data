import { loader } from "graphql.macro";
import { print } from 'graphql/language/printer';

export const getBasicPlayer = print(loader("./getBasicPlayer.gql"));

export const getBasicPlayerByName = print(loader("./getBasicPlayerByName.gql"));

export const getSkater = print(loader("./getSkater.gql"));

export const getGoalie = print(loader("./getGoalie.gql"));

export const getSelectedPlayers = print(loader("./getSelectedPlayers.gql"));

export const getSkaterDetailedStats = print(loader("./getSkaterDetailedStats.gql"));

export const getGoalieDetailedStats = print(loader("./getGoalieDetailedStats.gql"));
