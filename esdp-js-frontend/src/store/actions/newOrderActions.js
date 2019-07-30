import axios from '../../axios-api'
import {CALCULATE_TOTAL, GET_CLEANING_ITEMS, UPDATE_ORDER_ITEMS, UPDATE_USER_DATA} from "./actionTypes";

export const getAllFields = (cleaningFields) => {
  return dispatch => {
    dispatch({type: CALCULATE_TOTAL, cleaningFields});
  };
};

export const updateOrderItems = order => {
  return dispatch => {
    dispatch({type: UPDATE_ORDER_ITEMS, order});
  };
};

export const updateUserData = userData => {
  return dispatch => {
    dispatch({type: UPDATE_USER_DATA, userData});
  };
};

export const getCleaningItems = () => {
  return dispatch => {
    axios.post("/", {
      jsonrpc: '2.0',
      method: 'getCleaningItems',
      id: + new Date()
    })
      .then(
        response => {
          dispatch({type: GET_CLEANING_ITEMS, response});
        },
        error => {
          if (error.response && error.response.data) {
          } else {
            dispatch(console.log("No internet connection"));
          }
        }
      )
  }
};


