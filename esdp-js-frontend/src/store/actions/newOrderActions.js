import axios from '../../axios-api'
import {
  CALCULATE_TOTAL,
  GET_CLEANING_ITEMS, SET_LOADING,
  UPDATE_COMPLETED_DATE,
  UPDATE_ORDER_ITEMS,
  UPDATE_USER_DATA
} from "./actionTypes";
import {push} from "connected-react-router";

const setLoading = (loading) => {
    return dispatch => {
        dispatch({type: SET_LOADING, loading});
    };
};export const getAllFields = (cleaningFields) => {
    return dispatch => {
        dispatch({type: CALCULATE_TOTAL, cleaningFields});
    };
};
export const getCleaningItemsFromServer = (array) => {
  return dispatch => {
    dispatch({type: GET_CLEANING_ITEMS, array});
  }
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
    axios.post('/orders', order).then(() => {
      dispatch(push("/order-items"));
    })
  }
};

export const getUserByPhoneNumber = (phoneNumber) => {
  return dispatch => {
    const queryWithPlus = phoneNumber.replace("+", "%2B");
    dispatch(setLoading(true));
    return axios.get(`/orders/client?phone=${queryWithPlus}`).then(response => {
      if (response.data) {
        console.log(response.data);
        dispatch(setLoading(false));
        return response;
      }
      
    }).catch(() => dispatch(setLoading(false)))}
};


