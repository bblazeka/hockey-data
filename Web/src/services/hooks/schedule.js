import { useState } from "react";

export function useSchedule() {
  const defaultStart = new Date();
  const defaultEnd = new Date(defaultStart);
  defaultEnd.setDate(defaultStart.getDate() + 7);

  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);
  const setStartControl = (date) => {
    if (date.getTime() > end.getTime()) {
      const newEndDate = new Date(date);
      newEndDate.setDate(date.getDate() + 1);
      setEnd(newEndDate);
    }
    setStart(date);
  };
  const setEndControl = (date) => {
    if (date.getTime() < start.getTime()) {
      const newStartDate = new Date(date);
      newStartDate.setDate(date.getDate() - 1);
      setStart(newStartDate);
    }
    setEnd(date);
  };
  return { start, end, setStartControl, setEndControl };
}
