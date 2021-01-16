import * as actionTypes from './actionTypes';

const defaultAppState = {
  loaded: false,
  location: null
}

const utilReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case actionTypes.GET_LOCATION:
      return {
        ...state,
        location: null
      }
    case actionTypes.LOCATION_LOADED:
      return {
        ...state,
        location: action.payload
      }
    default:
      return state
  }
}

export default utilReducer;