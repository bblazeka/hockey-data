export function calculateGameScore(opponent: TGameOpponent) {
  const totalGames =
    opponent.leagueRecord.wins +
    opponent.leagueRecord.ot +
    opponent.leagueRecord.losses;
  return (
    (opponent.leagueRecord.wins * 2 + opponent.leagueRecord.ot) /
    (2 * totalGames)
  );
}

export function mapApiDivision(apiDivison: TApiDivision): TDivision {
  return { ...apiDivison, teams: [] };
}
