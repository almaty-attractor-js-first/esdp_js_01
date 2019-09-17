import { GET_WORKERS } from "../actions/actionTypes";

const initialState = {
	workers: []
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case GET_WORKERS:
			return {...state, workers: action.workers};
		default:
			return state;
	}
};

export default reducer;
