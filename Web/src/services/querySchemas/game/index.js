import { loader } from 'graphql.macro';
import { print } from 'graphql/language/printer';

export const getGamesBetweenTeams = print(loader("./getGamesBetweenTeams.gql"));

export const getDailyGames = loader('./getDailyGames.gql');
