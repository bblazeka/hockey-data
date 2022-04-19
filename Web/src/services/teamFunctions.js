import { getNews, getTweets, geocode } from "reducers/miscActions";
import { getTeamSchedule } from "reducers/leagueActions";
import { DateToServerFormat } from "util/common";

export function fetchTeamData(dispatch, team) {
  if (team) {
    const teamSocialQuery = `${team.name} hockey`;
    dispatch(geocode(`${team.venue.name} ${team.venue.city}`));
    dispatch(getNews(teamSocialQuery));
    dispatch(getTweets(teamSocialQuery));
    const today = new Date();
    const finish = new Date(today);
    finish.setDate(finish.getDate() + 14);
    const start = DateToServerFormat(today);
    const end = DateToServerFormat(finish);
    dispatch(getTeamSchedule(team.id, start, end));
  }
}