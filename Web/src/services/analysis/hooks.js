import { useMemo } from "react";

export const createSortedList = (players, category) => {
  const result = [];
  const sortedPlayers = players
    .sort((a, b) => {
      return b.stats[category] - a.stats[category];
    })
    .map((ps) => {
      return {
        label: ps.fullName,
        subLabel: ps.stats[category],
        angle: ps.stats[category],
      };
    });

  sortedPlayers.reduce(function (res, value, index) {
    const id = index > 7 ? "" : value.label;
    if (!res[id]) {
      res[id] = { label: id, subLabel: 0, angle: 0 };
      result.push(res[id]);
    }
    res[id].angle += value.angle;
    res[id].subLabel += value.subLabel;
    return res;
  }, {});
  return result;
};

export function separateGoaliesAndSkaters(rosterStats) {
  const skaters = useMemo(
    () =>
      rosterStats.filter((p) => {
        return p.stats.points !== null;
      }),
    [rosterStats]
  );
  const goalies = useMemo(
    () =>
      rosterStats.filter((p) => {
        return p.stats.points == null;
      }),
    [rosterStats]
  );
  return { skaters, goalies };
}
