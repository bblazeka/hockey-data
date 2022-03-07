export function getDivisionColor(rank) {
  if (rank <= 2) return "green";
  if (rank <= 3) return "olive";
  if (rank <= 4) return "yellow";
  if (rank <= 6) return "orange";
  return "red";
}

export function getLeagueRank(rank) {
  if (rank <= 8) return "green";
  if (rank <= 14) return "olive";
  if (rank <= 18) return "yellow";
  if (rank <= 26) return "orange";
  return "red";
}

export function getPointPercentageColor(percentage) {
  if (percentage > 66) return "green";
  if (percentage > 55) return "olive";
  if (percentage >= 50) return "yellow";
  if (percentage >= 40) return "orange";
  return "red";
}

export function getTeamDirection(seasonRank, currentRank) {
  const change = seasonRank - currentRank;
  if (change > 10)
    return {
      formIcon: "angle double up",
      formColor: "green",
    };
  if (change > 4) return { formIcon: "angle up", formColor: "olive" };
  if (change > -5) return { formIcon: "angle right", formColor: "yellow" };
  if (change > -10) return { formIcon: "angle down", formColor: "orange" };
  return {
    formIcon: "angle double down",
    formColor: "red",
  };
}
