import {UPDATE_CURRENT_ORDER, UPDATE_ORDERS} from "../actions/action-types";

const initialState = {
    orders: [],
    currentOrder: {},
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_ORDERS:
            return {...state, orders: action.orders};
        default:
            return state;
    }
};

export default reducer;
