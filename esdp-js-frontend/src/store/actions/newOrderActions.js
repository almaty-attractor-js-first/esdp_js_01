import {GET_ALL_CLEANING_FIELDS, UPDATE_CLEANING_TYPES} from "./actionTypes";

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

// export const getTotalPrice = (arr) => {
//     console.log("DISPATCH");
//     const total = arr.reduce(
//       (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.qty),
//       0
//     );
//     console.log(total);
//
//     setTotalPrice(total);
// };

