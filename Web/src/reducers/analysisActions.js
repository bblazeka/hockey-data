import { axiosGraphQL } from 'util/common';
import * as actionTypes from './actionTypes';
import * as querySchemas from './querySchemas';


export const getAnalysis = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_ANALYSIS,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getAnalysis })
    .then(response => {
      dispatch({
        type: actionTypes.ANALYSIS_LOADED,
        payload: response.data.data.analysis
      });
    });
};
