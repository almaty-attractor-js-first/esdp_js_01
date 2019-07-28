import axios from '../../axios-api'
import {GET_ALL_CLEANING_FIELDS, GET_CLEANING_ITEMS, UPDATE_CLEANING_TYPES, UPDATE_RPC_DATA} from "./actionTypes";

export const getAllFields = (totalPrice) => {
  return dispatch => {
    dispatch({type: GET_ALL_CLEANING_FIELDS, totalPrice});
  };
};

export const updateCleaningTypes = order => {
  return dispatch => {
    dispatch({type: UPDATE_CLEANING_TYPES, order});
  };
};

export const testMethod2 = userId => {
  return dispatch => {
    axios.post("/", {
      jsonrpc: '2.0',
      method: 'getUser',
      params: userId,
      id: + new Date()
    })
      .then(
        response => {
          console.log(response);
          console.log(response.data.result);
          dispatch({type: UPDATE_RPC_DATA, response});
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


