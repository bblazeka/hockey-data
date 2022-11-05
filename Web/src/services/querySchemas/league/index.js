import { loader } from "graphql.macro";
import { print } from 'graphql/language/printer';

export const getScheduleQuery = print(loader("./getSchedule.gql"));

export const getTeamScheduleQuery = loader("./getTeamScheduleQuery.gql");

export const getDivisionsWithTeams = loader("./getDivisionsWithTeams.gql");