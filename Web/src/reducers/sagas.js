import { call, put, takeLatest } from 'redux-saga/effects';

import { LeagueActionTypes } from "./actionTypes";
import { getSchedule } from './leagueActions';

function* fetchSchedule(action) {
  try {
    const schedule = yield call(getSchedule, action.payload.start, action.payload.end);
     yield put({type: LeagueActionTypes.SCHEDULE_LOADED, payload: schedule.data.schedule});
  } catch (e) {
     yield put({type: LeagueActionTypes.SCHEDULE_LOAD_FAILED, message: e.message});
  }
}

function* saga() {
  yield takeLatest(LeagueActionTypes.GET_SCHEDULE, fetchSchedule);
}

export default saga;