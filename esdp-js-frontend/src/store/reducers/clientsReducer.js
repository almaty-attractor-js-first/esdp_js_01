import {UPDATE_CLIENT_ORDERS} from "../actions/actionTypes";

const initialState = {
	clientOrders: []
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_CLIENT_ORDERS:
			return {...state, clientOrders: action.clientOrders};
		default:
			return state;
	}
};

export default reducer;
