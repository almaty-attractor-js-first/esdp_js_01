import {SET_LOADING, UPDATE_CURRENT_ORDER, UPDATE_ORDERS} from "../actions/actionTypes";

const initialState = {
    orders: [],
    currentOrder: {},
    loading: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_ORDERS:
            return {...state, orders: action.orders};
        case UPDATE_CURRENT_ORDER:
            return {...state, currentOrder: action.currentOrder};
        case SET_LOADING:
            return {...state, loading: action.loading};
        default:
            return state;
    }
};

export default reducer;
