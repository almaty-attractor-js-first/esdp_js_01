import {QUERY_ERROR, UPDATE_CLIENT_ORDERS} from "../actions/actionTypes";

const initialState = {
	clientOrders: [],
	queryError: null
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_CLIENT_ORDERS:
			return {...state, clientOrders: action.clientOrders};
		case QUERY_ERROR:
			return {...state, queryError: action.error};
		default:
			return state;
	}
};

export default reducer;
