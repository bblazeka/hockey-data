import {AnalysisActionTypes} from "./actionTypes";

const defaultAppState = {
  loading: false,
};

const analysisReducer = (state = defaultAppState, action) => {
  switch (action.type) {
    case AnalysisActionTypes.GET_ANALYSIS:
      return {
        ...state,
        analysis: undefined,
      };
    case AnalysisActionTypes.ANALYSIS_LOADED:
      return {
        ...state,
        analysis: action.payload,
      };
    default:
      return state;
  }
};

export default analysisReducer;
