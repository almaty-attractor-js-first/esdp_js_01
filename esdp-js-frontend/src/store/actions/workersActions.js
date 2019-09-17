import axios from '../../axios-api'
import {GET_WORKERS} from "./actionTypes";

export const setWorkers = (workers) => {
	return dispatch => {
		dispatch({type: GET_WORKERS, workers});
	}
};


export const getWorkers = () => {
	return dispatch => {
		return axios.get("/workers")
			.then(response => {
				let workers = response.data;
				dispatch(setWorkers(workers));
				return response;
			},error => {
				if (error.response && error.response.data) {
				} else {
					dispatch(console.log("No internet connection"));
				}
			})
	}
};