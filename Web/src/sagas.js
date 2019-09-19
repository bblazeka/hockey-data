import { takeEvery, call, put, all } from "redux-saga/effects";
import * as actions from './actions/appActions';
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga

export function* watcherSaga() {
    yield all([
      takeEvery(actions.GET_SCHEDULE, workerSagaSchedule),
      takeEvery(actions.GET_STANDINGS, workerSagaStandings),
      takeEvery(actions.GET_TEAM, workerSagaTeam),
      takeEvery(actions.GET_TEAMS, workerSagaTeams),
    ]);
  }
  
  // function that makes the api request and returns a Promise for response
  function sendRequest(params) {
    console.log(params)
    return axios({
      method: "get",
      url: params.path,
      headers: {"Content-Type": "application/json"}
    });
  }
  
  // worker saga: makes the api call when watcher saga sees the action
  export function* workerSagaSchedule(params) {
    try {
      const response = yield call(sendRequest,{
        path: "http://localhost:50540/api/league/schedule/"+params.payload.start+"?enddate="+params.payload.end,
      });
      console.log(response)
  
      // dispatch a success action to the store with the payload
      if (response) {
        yield put({ type: actions.SCHEDULE_LOADED, payload: response.data });
      }
    } catch (error) {
      alert(error)
      // dispatch a failure action to the store with the error
      // yield put({ type: actions.SUBMIT_EGG_FAILURE, error });
    }
  }

  export function* workerSagaStandings() {
    try {
      const response = yield call(sendRequest,{
        path: "http://localhost:50540/api/league/standings",
      });
      console.log(response)
  
      // dispatch a success action to the store with the payload
      if (response) {
        yield put({ type: actions.STANDINGS_LOADED, payload: response.data });
      }
    } catch (error) {
      alert(error)
      // dispatch a failure action to the store with the error
      // yield put({ type: actions.SUBMIT_EGG_FAILURE, error });
    }
  }

  export function* workerSagaTeam(params) {
    try {
      const response = yield call(sendRequest,{
        path: "http://localhost:50540/api/team/"+params.payload.id,
      });
      console.log(response)
  
      // dispatch a success action to the store with the payload
      if (response) {
        yield put({ type: actions.TEAM_LOADED, payload: response.data });
      }
    } catch (error) {
      alert(error)
      // dispatch a failure action to the store with the error
      // yield put({ type: actions.SUBMIT_EGG_FAILURE, error });
    }
  }

  export function* workerSagaTeams() {
    try {
      const response = yield call(sendRequest,{
        path: "http://localhost:50540/api/league/teams",
      });
      console.log(response)
  
      // dispatch a success action to the store with the payload
      if (response) {
        yield put({ type: actions.TEAMS_LOADED, payload: response.data });
      }
    } catch (error) {
      alert(error)
      // dispatch a failure action to the store with the error
      // yield put({ type: actions.SUBMIT_EGG_FAILURE, error });
    }
  }