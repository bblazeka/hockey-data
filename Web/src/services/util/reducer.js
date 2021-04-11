import * as actionTypes from './actionTypes';

const defaultAppState = {
  locationLoading: false,
  location: null
};

const utilReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case actionTypes.GET_LOCATION:
      return {
        ...state,
        locationLoading: true,
        location: null
      };
    case actionTypes.LOCATION_LOADED:
      return {
        ...state,
        locationLoading: false,
        location: action.payload
      };
    default:
      return state;
  }
};

export default utilReducer;