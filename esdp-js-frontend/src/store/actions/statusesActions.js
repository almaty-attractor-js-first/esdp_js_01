import axios from '../../axios-api'
import {SET_STATUSES, SET_CHANGED_STATUSES} from "./actionTypes";
import store from "../configureStore";
import {openSnack} from "./notificationsActions";

export const setStatuses = (array) => {
	return dispatch => {
		dispatch({type: SET_STATUSES, array});
	}
};

export const setChangedStatuses = (JSONString) => {
	return dispatch => {
		dispatch({type: SET_CHANGED_STATUSES, JSONString});
	}
};

export const setCurrentStatusColor = (color, statusId) => {
	console.log(color);
	console.log(statusId);
	const statuses = [...store.getState().statusesReducer.statuses];
	const index = statuses.findIndex(status => {return status.id === statusId});
	statuses[index].color = color;
	console.log(statuses[index]);
	
	return dispatch => {
		dispatch(setStatuses(statuses));
	}
};

export const getStatuses = () => {
	return dispatch => {
		return axios.get("/statuses").then(response => {
			let data = response.data;
			dispatch(setStatuses(data));
			const JSONString = JSON.stringify(data);
			dispatch(setChangedStatuses(JSONString));
			return response;
		},error => {
			if (error.response && error.response.data) {
			} else {
				dispatch(console.log("No internet connection"));
			}
		})
	}
};

export const updateStatuses = (statuses) => {
	return dispatch => {
		console.log('updated');
		axios.put('/statuses', statuses).then(() => {
			dispatch(openSnack(('Статус успешно обновлен'), 'info'));
		});
	}
};

export const saveStatus = (status) => {
	return dispatch => {
		console.log('saved');
		axios.post('/statuses', status).then(() => {
			dispatch(openSnack(('Статус успешно сохранен'), 'success'));
		});
	}
};

export const updateStatus = (status) => {
	return dispatch => {
		console.log('updatetOne');
		axios.put(`/statuses/${status.id}`, status).then(() => {
			dispatch(openSnack(('Статус успешно обновлен'), 'info'));
		});
	}
};