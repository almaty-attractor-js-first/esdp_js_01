import {SET_STATUSES, SET_CHANGED_STATUSES} from "../actions/actionTypes";

const initialState = {
	statuses: [],
	changedStatuses: ''
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_STATUSES:
			return {...state, statuses: action.array};
		case SET_CHANGED_STATUSES:
			return {...state, changedStatuses: action.JSONString};
		default:
			return state;
	}
};

export default reducer;
