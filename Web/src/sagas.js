import { takeEvery, call, put } from "redux-saga/effects";
import * as actions from './actions/appActions';
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga

export function* watcherSaga() {
    yield takeEvery(actions.GET_SCHEDULE, workerSaga);
  }
  
  // function that makes the api request and returns a Promise for response
  function sendRequest(params) {
    console.log(params)
    return axios({
      method: "get",
      url: "http://localhost:50540/api/league/schedule/"+params.start+"?enddate="+params.end,
      headers: {"Content-Type": "application/json"}
    });
  }
  
  // worker saga: makes the api call when watcher saga sees the action
  export function* workerSaga(params) {
    try {
      const response = yield call(sendRequest,params.payload);
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