import axios from '../../axios-api'
import {CALCULATE_TOTAL, GET_CLEANING_ITEMS, UPDATE_CLEANING_TYPES, UPDATE_USER_DATA} from "./actionTypes";

export const getAllFields = (cleaningFields) => {
  return dispatch => {
    dispatch({type: CALCULATE_TOTAL, cleaningFields});
  };
};

export const updateCleaningTypes = order => {
  return dispatch => {
    dispatch({type: UPDATE_CLEANING_TYPES, order});
  };
};

export const updateUserData = userData => {
  return dispatch => {
    dispatch({type: UPDATE_USER_DATA, userData});
  };
};

export const getCleaningItems = () => {
  console.log('getCleaning');
  return dispatch => {
    axios.post("/", {
      jsonrpc: '2.0',
      method: 'getCleaningItems',
      id: + new Date()
    })
      .then(
        response => {
          console.log('dispatchCleaning');
          dispatch({type: GET_CLEANING_ITEMS, response});
        },
        error => {
          if (error.response && error.response.data) {
            console.log('error')
          } else {
            dispatch(console.log("No internet connection"));
          }
        }
      )
  }
};


