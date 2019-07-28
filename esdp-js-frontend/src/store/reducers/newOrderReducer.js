import {
  CALCULATE_TOTAL,
  GET_CLEANING_ITEMS,
  UPDATE_CLEANING_TYPES,
  UPDATE_USER_DATA
} from "../actions/actionTypes";

const initialState = {
  userData: {
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  },
  cleaningTypes: [
    {
      cleaningType: "",
      qty: 0,
      price: 0
    },
  ],
  totalPrice: 0,
  cleaningItems: [],
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case CALCULATE_TOTAL:
      const total = action.cleaningFields.reduce(
        (accumulator, cleaningField) => accumulator + (cleaningField.price * cleaningField.qty),
        0
      );
      return {...state, totalPrice: total};
    case UPDATE_CLEANING_TYPES:
      return {...state, cleaningTypes: action.order};
    case UPDATE_USER_DATA:
      return {...state, userData: action.userData};
    case GET_CLEANING_ITEMS:
      return {...state, cleaningItems: action.response.data.result};
    default:
      return state;
  }
};

export default reducer;
