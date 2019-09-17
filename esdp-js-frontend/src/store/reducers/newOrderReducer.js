import {
  CALCULATE_TOTAL,
  GET_CLEANING_ITEMS, SET_LOADING, UPDATE_COMPLETED_DATE,
  UPDATE_ORDER_ITEMS,
  UPDATE_USER_DATA,
  UPDATE_SAVED_ORDER
} from "../actions/actionTypes";
const d = new Date();
const initialState = {
  userData: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
  },
  orderItems: [
    {
      cleaningType: "",
      qty: 1,
      price: 0
    },
  ],
  totalPrice: 0,
  completedDate: d.setDate(d.getDate() + 5),
  cleaningItems: [],
  loading: false,
  savedOrder: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case CALCULATE_TOTAL:
      const total = action.cleaningFields.reduce(
        (accumulator, cleaningField) => accumulator + (cleaningField.price * cleaningField.qty),
        0
      );
      return {...state, totalPrice: total};
    case UPDATE_ORDER_ITEMS:
      return {...state, orderItems: action.order};
    case UPDATE_USER_DATA:
      return {...state, userData: action.userData};
    case UPDATE_COMPLETED_DATE:
      return {...state, completedDate: action.completedDate};
    case GET_CLEANING_ITEMS:
      return {...state, cleaningItems: action.array};
    case UPDATE_SAVED_ORDER:
      return {...state, savedOrder: action.savedOrder};
    case SET_LOADING:
      return {...state, loading: action.loading};
    default:
      return state;
  }
};

export default reducer;
