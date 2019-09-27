import {QUERY_ERROR, GET_CLIENTS, UPDATE_CLIENT_ORDERS,} from "../actions/actionTypes";

const initialState = {
	clients: [],
	clientOrders: [],
	queryError: null
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case GET_CLIENTS:
			return {...state, clients: action.clients};
		case UPDATE_CLIENT_ORDERS:
			return {...state, clientOrders: action.clientOrders};
		case QUERY_ERROR:
			return {...state, queryError: action.error};
		default:
			return state;
	}
};

export default reducer;
