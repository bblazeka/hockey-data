import * as actionTypes from "./actionTypes";

const defaultAppState = {
  loading: false,
};

const analysisReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case actionTypes.GET_ANALYSIS:
      return {
        ...state,
        analysis: undefined,
      };
    case actionTypes.ANALYSIS_LOADED:
      return {
        ...state,
        analysis: action.payload,
      };
    default:
      return state;
  }
};

export default analysisReducer;
