import {UPDATE_ORDERS} from "../actions/actionTypes";

const initialState = {
    orders: []
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
