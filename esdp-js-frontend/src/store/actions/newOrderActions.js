import axios from '../../axios-api'
import {
  CALCULATE_TOTAL,
  GET_CLEANING_ITEMS, SET_LOADING,
  UPDATE_COMPLETED_DATE,
  UPDATE_ORDER_ITEMS, UPDATE_SAVED_ORDER,
  UPDATE_USER_DATA
} from "./actionTypes";
import {push} from "connected-react-router";

const setLoading = (loading) => {
    return dispatch => {
        dispatch({type: SET_LOADING, loading});
    };
};
export const getAllFields = (cleaningFields) => {
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
export const updateSavedOrder = savedOrder => {
  return dispatch => {
    dispatch({type: UPDATE_SAVED_ORDER, savedOrder});
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
  order.phone = order.phone.replace(/[^0-9]/g, '');
  return dispatch => {
    return axios.post('/orders', order)
    .then(res => {
      dispatch(updateSavedOrder(res.data));
      return res;
    })
    // .then((res) => {
    //     dispatch(push("/orders/saved"));
    //     return res;
    // })
  }
};

export const getUserByPhoneNumber = (phoneNumber) => {
  return dispatch => {
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    dispatch(setLoading(true));
    return axios.get(`/orders/client?phone=${phoneNumber}`).then(response => {
      if (response.data) {
        dispatch(setLoading(false));
        return response;
      }
      
    }).catch(() => dispatch(setLoading(false)))}
};


