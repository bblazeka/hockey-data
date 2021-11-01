import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

import { getSchedule } from "services/league";
import { Loader } from "components";
import { DateToServerFormat, getDatesArray } from "util/common";
import ScheduleTable from "./ScheduleTable";
import { selectSchedule } from "services/selectors";

const SchedulePageStyled = styled.div`
  overflow-x: auto;
`;

const TagContainerStyled = styled.div`
  display: flex;
  max-width: 400px;
`;

const FilterContainer = styled.div`
  display: inline-flex;
`;

const DatesFilterStyled = styled.div`
  display: flex;
  max-width: 500px;
`;

const RefreshButton = styled(Label)`
  cursor: pointer;
`;

const HomeGameTag = styled(Label)`
  background-color: turquoise !important;
`;

const AwayGameTag = styled(Label)`
  background-color: lightblue !important;
`;

const defaultStart = new Date();
const defaultEnd = new Date(defaultStart);
defaultEnd.setDate(defaultStart.getDate() + 7);

export default function Schedule() {
  const { schedule } = useSelector(selectSchedule);
  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);
  const dispatch = useDispatch();
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
    <SchedulePageStyled>
      <FilterContainer>
        <DatesFilterStyled>
          <DatePicker
            selected={start}
            onChange={(date) => setStartControl(date)}
            dateFormat="dd.MM.yyyy"
          />
          <DatePicker
            selected={end}
            onChange={(date) => setEndControl(date)}
            dateFormat="dd.MM.yyyy"
          />
          <RefreshButton onClick={() => getScheduleForTimePeriod()}>
            <Icon name="refresh" /> Refresh
          </RefreshButton>
        </DatesFilterStyled>
        <TagContainerStyled>
          <HomeGameTag tag>Home game</HomeGameTag>
          <AwayGameTag tag>Away game</AwayGameTag>
        </TagContainerStyled>
      </FilterContainer>
      <ScheduleTable dates={dates} schedule={schedule} />
    </SchedulePageStyled>
  );
}
