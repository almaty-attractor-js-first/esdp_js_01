import {SET_STATUSES} from "../actions/actionTypes";

const initialState = {
	statuses: [],
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_STATUSES:
			return {...state, statuses: action.array};
		default:
			return state;
	}
};

export default reducer;
