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
      takeEvery(actions.GET_PLAYER, workerSagaPlayer),
      takeEvery(actions.SEARCH_PLAYER, workerSagaSearchPlayer),
      takeEvery(actions.GET_PREDICTION, workerSagaPrediction),
      takeEvery(actions.BASIC_SEARCH_PLAYER, workerSagaBasicSearchPlayer),
      takeEvery(actions.GET_NEWS, workerSagaNews),
      takeEvery(actions.GET_GAME, workerGame),
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
        path: "http://localhost:50540/api/data/teams",
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

  export function* workerSagaPlayer(params) {
    try {
      const response = yield call(sendRequest,{
        path: "http://localhost:50540/api/player/"+params.payload.id,
      });
      console.log(response)
      // dispatch a success action to the store with the payload
      if (response) {
        yield put({ type: actions.PLAYER_LOADED, payload: response.data });
      }
    } catch (error) {
      alert(error)
      // dispatch a failure action to the store with the error
      // yield put({ type: actions.SUBMIT_EGG_FAILURE, error });
    }
  }

  export function* workerSagaBasicSearchPlayer(params) {
    try {
      const response = yield call(sendRequest,{
        path: "http://localhost:50540/api/data/player/"+params.payload.name,
      });
      console.log(response)
      // dispatch a success action to the store with the payload
      if (response) {
        yield put({ type: actions.BASIC_PLAYER_LOADED, payload: response.data });
      }
    } catch (error) {
      alert(error)
      // dispatch a failure action to the store with the error
      // yield put({ type: actions.SUBMIT_EGG_FAILURE, error });
    }
  }

  export function* workerSagaSearchPlayer(params) {
    try {
      const response = yield call(sendRequest,{
        path: "http://localhost:50540/api/data/player/"+params.payload.name,
      });
      console.log(response)
      // dispatch a success action to the store with the payload
      if (response) {
        const player = yield call(sendRequest,{
          path: "http://localhost:50540/api/player/"+response.data[0].id,
        });
        console.log(params.payload)
        if (player) {
          if (params.payload.individual) {
            yield put({ type: actions.PLAYER_LOADED, payload: player.data });
          }
          else {
            yield put({ type: actions.ADD_PLAYER, payload: player.data });
          }
          
        }
      }
    } catch (error) {
      alert(error)
      // dispatch a failure action to the store with the error
      // yield put({ type: actions.SUBMIT_EGG_FAILURE, error });
    }
  }

  export function* workerSagaPrediction() {
    try {
      const response = yield call(sendRequest,{
        path: "http://localhost:5000/predict",
      });
      console.log(response)
      // dispatch a success action to the store with the payload
      if (response) {
        yield put({ type: actions.PREDICTION_LOADED, payload: response.data });
      }
    } catch (error) {
      alert(error)
      // dispatch a failure action to the store with the error
      // yield put({ type: actions.SUBMIT_PREDICTION_FAILURE, error });
    }
  }

  export function* workerSagaNews() {
    try {
      const response = yield call(sendRequest,{
        path: "http://localhost:5000/news",
      });
      console.log(response)
      // dispatch a success action to the store with the payload
      if (response) {
        yield put({ type: actions.NEWS_LOADED, payload: response.data });
      }
    } catch (error) {
      alert(error)
      // dispatch a failure action to the store with the error
      // yield put({ type: actions.SUBMIT_NEWS_FAILURE, error });
    }
  }

  export function* workerGame(params) {
    try {
      const response = yield call(sendRequest,{
        path: "http://localhost:50540/api/game/"+params.payload.id,
      });
      console.log(response)
      // dispatch a success action to the store with the payload
      if (response) {
        yield put({ type: actions.GAME_LOADED, payload: response.data });
      }
    } catch (error) {
      alert(error)
      // dispatch a failure action to the store with the error
      // yield put({ type: actions.GAME_LOAD_FAILURE, error });
    }
  }