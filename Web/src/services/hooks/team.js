import { useQuery } from "@apollo/client";

import { getTeamScheduleQuery } from "services/querySchemas/league";
import { geocode, getNews, getTweets } from "services/querySchemas/misc";
import { DateToServerFormat } from "util/common";

export function useTeamData(team) {
  const teamSocialQuery = `${team?.name} hockey`;
  const {
    loading: x,
    data: locationData,
  } = useQuery(geocode, {variables: { query: `${team?.venue.name} ${team?.venue.city}` }});
  const {
    loading: w,
    data: newsData,
  } = useQuery(getNews, {variables: { query: teamSocialQuery }});
  const {
    loading: c,
    data: tweetsData,
  } = useQuery(getTweets, {variables: { query: teamSocialQuery }});
  const today = new Date();
  const finish = new Date(today);
  finish.setDate(finish.getDate() + 14);
  const start = DateToServerFormat(today);
  const end = DateToServerFormat(finish);
  const {
    loading: hw,
    data: teamGamesData,
  } = useQuery(getTeamScheduleQuery, {variables: { id: team?.id, start, end }});
  return { teamDataLoading: x || w || c || hw, location: locationData?.location, news: newsData?.articles, tweets: tweetsData?.tweets, teamGames: teamGamesData?.scheduleByTeam };
}
