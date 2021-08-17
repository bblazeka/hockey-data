import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "./Schedule.scss";
import { getSchedule } from "services/league";
import { Loader } from "components";
import { DateToServerFormat, getDatesArray } from "util/common";
import ScheduleTable from "./ScheduleTable";
import { selectSchedule } from "services/selectors";

const defaultStart = new Date();
const defaultEnd = new Date(defaultStart);
defaultEnd.setDate(defaultStart.getDate() + 7);

export default function Schedule() {
  const { schedule } = useSelector(selectSchedule);
  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);
  const dispatch = useDispatch();
  const getScheduleForTimePeriod = () => {
    const startDate = DateToServerFormat(start);
    const endDate = DateToServerFormat(end);
    dispatch(getSchedule(startDate, endDate));
  };

  useEffect(() => {
    getScheduleForTimePeriod();
  }, []);

  const dates = getDatesArray(start, end);
  if (!schedule) {
    return <Loader></Loader>;
  }
  return (
    <div className="schedule-page">
      <div className="filter">
        <div className="dates">
          <DatePicker
            selected={start}
            onChange={(date) => setStart(date)}
            dateFormat="dd.MM.yyyy"
          />
          <DatePicker
            selected={end}
            onChange={(date) => setEnd(date)}
            dateFormat="dd.MM.yyyy"
          />
          <Label
            className="refresh-button"
            onClick={() => getScheduleForTimePeriod()}
          >
            <Icon name="refresh" /> Refresh
          </Label>
        </div>
        <div className="tag-container">
          <Label as="a" className="home-game-tag" tag>
            Home game
          </Label>
          <Label as="a" className="away-game-tag" tag>
            Away game
          </Label>
        </div>
      </div>
      <ScheduleTable dates={dates} schedule={schedule} />
    </div>
  );
}
