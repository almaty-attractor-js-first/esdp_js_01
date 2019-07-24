import {GET_ALL_CLEANING_FIELDS, UPDATE_CLEANING_TYPES} from "../actions/actionTypes";

const initialState = {
  totalPrice: 0,
  cleaningTypes: [
    {
      cleaningType: "",
      qty: 0,
      price: 0
    },
  ]
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ALL_CLEANING_FIELDS:
      const total = action.totalPrice.reduce(
        (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.qty),
        0
      );
      return {...state, totalPrice: total};
    case UPDATE_CLEANING_TYPES:
      return {...state, cleaningTypes: action.order};
    default:
      return state;
  }
};

export default reducer;
