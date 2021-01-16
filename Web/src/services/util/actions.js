import { axiosGraphQL } from '../../util/common';
import * as actionTypes from './actionTypes';
import * as querySchemas from './querySchemas';


export const geocode = (query) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_LOCATION,
  });
  axiosGraphQL
    .post('', { query: querySchemas.geocode(query) })
    .then(response => {
      dispatch({
        type: actionTypes.LOCATION_LOADED,
        payload: response.data.data.geocode[0]
      })
    });
}