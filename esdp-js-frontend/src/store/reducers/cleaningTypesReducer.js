import {SET_CHANGED_CLEANING_TYPES, SET_CLEANING_TYPES} from "../actions/actionTypes";

const initialState = {
	cleaningTypes: [],
	changedCleaningTypes: ''
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case SET_CLEANING_TYPES:
			return {...state, cleaningTypes: action.array};
		case SET_CHANGED_CLEANING_TYPES:
			return {...state, changedCleaningTypes: action.JSONString};
		default:
			return state;
	}
};

export default reducer;
