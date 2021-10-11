const mapPlayer = (player: TApiGamePlayer): TGamePlayer => {
  return {
    person: {
      id: player.person.id,
      fullName: player.person.fullName,
    },
    jerseyNumber: player.jerseyNumber,
    position: player.position,
  } as TGamePlayer;
};

export const mapSkater = (player: TApiGamePlayer): TGamePlayer => {
  return {
    ...mapPlayer(player),
    stats: player.stats.skaterStats,
  };
};

export const mapGoalie = (player: TApiGamePlayer): TGamePlayer => {
  return {
    ...mapPlayer(player),
    stats: player.stats.goalieStats,
  };
};
