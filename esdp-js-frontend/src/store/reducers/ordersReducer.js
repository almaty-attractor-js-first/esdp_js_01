import {UPDATE_CURRENT_ORDER, UPDATE_ORDERS} from "../actions/actionTypes";

const initialState = {
    orders: [],
    currentOrder: {},
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_ORDERS:
            return {...state, orders: action.orders};
        case UPDATE_CURRENT_ORDER:
            return {...state, currentOrder: action.currentOrder};
        default:
            return state;
    }
};

export default reducer;
