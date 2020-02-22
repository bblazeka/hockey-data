import * as common from '../util/common';

export const GET_PREDICTION = 'GET_PREDICTION'
export const PREDICTION_LOADED = 'PREDICTION_LOADED'
export const GET_SCHEDULE = 'GET_SCHEDULE'
export const SCHEDULE_LOADED = 'SCHEDULE_LOADED'
export const GET_STANDINGS = 'GET_STANDINGS'
export const STANDINGS_LOADED = 'STANDINGS_LOADED'
export const GET_TEAM = 'GET_TEAM'
export const TEAM_LOADED = 'TEAM_LOADED'
export const GET_TEAMS = 'GET_TEAMS'
export const TEAMS_LOADED = 'TEAMS_LOADED'
export const POPULATE_DATABASE = 'POPULATE_DATABASE'
export const UPDATE_DATABASE = 'UPDATE_DATABASE'
export const GET_PLAYER = 'GET_PLAYER'
export const BASIC_SEARCH_PLAYER = 'BASIC_SEARCH_PLAYER'
export const BASIC_PLAYER_LOADED = 'BASIC_PLAYER_LOADED'
export const SEARCH_PLAYER = 'SEARCH_PLAYER'
export const ADD_PLAYER = 'ADD_PLAYER'
export const REMOVE_PLAYER = 'REMOVE_PLAYER'
export const PLAYER_LOADED = 'PLAYER_LOADED'
export const GET_NEWS = 'GET_NEWS'
export const NEWS_LOADED = 'NEWS_LOADED'
export const ADD_TO_LINEUP = 'ADD_TO_LINEUP'
export const GET_GAME = 'GET_GAME'
export const GAME_LOADED = 'GAME_LOADED'
export const GET_DROPDOWN_TEAMS = 'GET_DROPDOWN_TEAMS'
export const DROPDOWN_TEAMS_LOADED = 'DROPDOWN_TEAMS_LOADED'

export const getNews = () => (dispatch, getState) => {
  dispatch({
    type: 'GET_NEWS',
  });

  common.customFetch(`${common.pyServiceEndpoint}/news`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'NEWS_LOADED',
      payload: data
    })
  }));
}

export const getPrediction = () => (dispatch, getState) => {
  dispatch({
    type: 'GET_PREDICTION',
  });

  common.customFetch(`${common.pyServiceEndpoint}/predict`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'PREDICTION_LOADED',
      payload: data
    })
  }));
}

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

export const getPlayer = (id) => (dispatch, getState) => {
  dispatch({
    type: 'GET_PLAYER',
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/player/${id}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'PLAYER_LOADED',
      payload: data
    })
  }));
}

export const getStandings = () => (dispatch, getState) => {
  dispatch({
    type: 'GET_STANDINGS',
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/league/standings`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'STANDINGS_LOADED',
      payload: data
    })
  }));
}

export const getTeam = (id) => (dispatch, getState) => {
  dispatch({
    type: 'GET_TEAMS',
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/team/${id}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'TEAM_LOADED',
      payload: data
    })
  }));
}

export const getTeams = () => (dispatch, getState) => {
  dispatch({
    type: 'GET_TEAMS',
  });
  common.customFetch(`${common.apiServiceEndpoint}/api/data/teams`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'TEAMS_LOADED',
      payload: data
    })
  }));
}

export const populateDatabase = () => ({
  type: POPULATE_DATABASE,
})

export const updateDatabase = () => ({
  type: UPDATE_DATABASE,
})

export const searchBasicPlayer = (name) => (dispatch, getState) => {
  dispatch({
    type: 'BASIC_SEARCH_PLAYER',
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/data/player/search/${name}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'BASIC_PLAYER_LOADED',
      payload: data
    })
  }));
}

export const searchPlayer = (name, individual)  => (dispatch, getState) => {
  dispatch({
    type: 'SEARCH_PLAYER',
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/data/player/search/${name}`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    common.customFetch(`${common.apiServiceEndpoint}/api/player/${data[0].id}`, getState, {
      method: 'GET',
    }).then(response => response.json().then(data2 => {
      if (individual) {
        dispatch({
          type: 'PLAYER_LOADED',
          payload: data2
        })
      }
      else
      {
        dispatch({
          type: 'ADD_PLAYER',
          payload: data2
        })
      }
    }));
  }));
}

export const removePlayer = (id) => ({
  type: REMOVE_PLAYER,
  payload: {
    id,
  }
})

export const addToLineup = (player) => ({
  type: ADD_TO_LINEUP,
  payload: {
    player,
  }
})

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

export const getDropdownTeams = () => (dispatch, getState) => {
  dispatch({
    type: 'GET_DROPDOWN_TEAMS',
  });

  common.customFetch(`${common.apiServiceEndpoint}/api/data/teams/dropdown`, getState, {
    method: 'GET',
  }).then(response => response.json().then(data => {
    dispatch({
      type: 'DROPDOWN_TEAMS_LOADED',
      payload: data
    })
  }));
}