import {SET_CHANGED_CLEANING_TYPES, SET_CLEANING_TYPES} from "./actionTypes";
import axios from "../../axios-api";

export const setCleaningTypes = (array) => {
	return dispatch => {
		dispatch({type: SET_CLEANING_TYPES, array});
	}
};

export const setChangedCleaningTypes = (JSONString) => {
	return dispatch => {
		dispatch({type: SET_CHANGED_CLEANING_TYPES, JSONString});
	}
};

export const getCleaningTypes = () => {
	return dispatch => {
		axios.get("/cleaning-items").then(response => {
			let data = response.data;
			dispatch(setCleaningTypes(data));
			const JSONString = JSON.stringify(data);
			dispatch(setChangedCleaningTypes(JSONString));
			return response;
		},error => {
			if (error.response && error.response.data) {
			} else {
				dispatch(console.log("No internet connection"));
			}
		})
	}
};

export const updateCleaningTypes = (cleaningTypes) => {
	return dispatch => {
		console.log('updated');
		axios.put('/cleaning-items', cleaningTypes);
	}
};

export const saveCleaningType = (cleaningType) => {
	return dispatch => {
		console.log('saved');
		axios.post('/cleaning-items', cleaningType);
	}
};

export const updateCleaningType = (cleaningType) => {
	return dispatch => {
		console.log('updatetOne');
		axios.put(`/cleaning-items/${cleaningType.id}`, cleaningType);
	}
};