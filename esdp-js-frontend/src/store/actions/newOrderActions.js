import axios from '../../axios-api'
import {
  CALCULATE_TOTAL,
  GET_CLEANING_ITEMS,
  UPDATE_COMPLETED_DATE,
  UPDATE_ORDER_ITEMS,
  UPDATE_USER_DATA
} from "./actionTypes";
import {push} from "connected-react-router";

export const getAllFields = (cleaningFields) => {
  return dispatch => {
    dispatch({type: CALCULATE_TOTAL, cleaningFields});
  };
};

export const getCleaningItemsFromServer = (array) => {
  return dispatch => {
    dispatch({type: GET_CLEANING_ITEMS, array});
  }
}
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

export const updateCompletedDate = completedDate => {
  return dispatch => {
    dispatch({type: UPDATE_COMPLETED_DATE, completedDate});
  };
};

export const getCleaningItems = () => {
  return dispatch => {
    axios.get("/cleaning-items").then(response => {
      let data = response.data;
      dispatch(getCleaningItemsFromServer(data));
    },error => {
      if (error.response && error.response.data) {
      } else {
        dispatch(console.log("No internet connection"));
      }
    })
  }
};


export const addOrder = (order) => {
  return dispatch => {
  axios.post('/orders' , order).then(() => {
    dispatch(push("/"));
  })
  }
};
