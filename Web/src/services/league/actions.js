import * as common from '../../util/common';

export const getSchedule = (start, end) => (dispatch, getState) => {
  dispatch({
    type: 'GET_SCHEDULE',
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/schedule?start=${start}&end=${end}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'SCHEDULE_LOADED',
      payload: data
    })
  }));
}

export const getStandings = () => (dispatch, getState) => {
  dispatch({
    type: 'GET_STANDINGS',
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/standings/20192020`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'STANDINGS_LOADED',
      payload: data
    })
  }));
}

export const findGame = (date, home, away) => (dispatch, getState) => {
  dispatch({
    type: 'FIND_GAME',
  });
  common.customFetch(`${common.apiServiceEndpoint}/api/games/search?homeId=${home}&awayId=${away}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    common.customFetch(`${common.apiServiceEndpoint}/api/game/${data[0].gamePk}`, getState, {
      method: 'GET',
    }).then(response => response.json().then(data2 => {
      dispatch({
        type: 'GAME_FOUND',
        payload: data2
      })
    }));
  }));
}

export const getGame = (id) => (dispatch, getState) => {
  dispatch({
    type: 'GET_GAME',
  });common.customFetch(`${common.apiServiceEndpoint}/api/game/${id}`, getState, {
      method: 'GET',
    }).then(response => response.json().then(data => {
      dispatch({
        type: 'GAME_LOADED',
        payload: data
      })
  }));
}