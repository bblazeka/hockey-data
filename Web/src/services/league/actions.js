import * as common from '../../util/common';

export const getSchedule = (start, end) => (dispatch, getState) => {
  dispatch({
    type: 'GET_SCHEDULE',
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/league/schedule/${start}?enddate=${end}`, getState, {
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

export const getGame = (home, away) => (dispatch, getState) => {
  dispatch({
    type: 'GET_GAME',
  });
  console.log(home,away)
  common.customFetch(`${common.apiServiceEndpoint}/api/game/2019-10-16?homeId=${home}&awayId=${away}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'GAME_LOADED',
      payload: data
    })
  }));
}