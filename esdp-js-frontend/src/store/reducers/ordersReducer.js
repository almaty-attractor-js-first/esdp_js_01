import {GET_TOTAL_ORDERS_COUNT, SET_LOADING, UPDATE_CURRENT_ORDER, UPDATE_ORDERS} from "../actions/actionTypes";

const initialState = {
    orders: [],
    currentOrder: {},
    loading: false,
    totalOrdersCount: 0
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_ORDERS:
            return {...state, orders: action.orders};
        case UPDATE_CURRENT_ORDER:
            return {...state, currentOrder: action.currentOrder};
        case SET_LOADING:
            return {...state, loading: action.loading};
        case GET_TOTAL_ORDERS_COUNT:
            return {...state, totalOrdersCount: action.total};
        default:
            return state;
    }
};

export default reducer;
