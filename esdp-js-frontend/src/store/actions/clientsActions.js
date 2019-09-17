import axios from '../../axios-api'
import {UPDATE_CLIENT_ORDERS} from "./actionTypes";


export const updateClientOrders = clientOrders => {
	return dispatch => {
		dispatch({type: UPDATE_CLIENT_ORDERS, clientOrders});
	};
};


export const getClientOrders = () => {
	return dispatch => {
		axios.get("/orders/:phone").then(response => {
			let data = response.data;
			dispatch(updateClientOrders(data));
		},error => {
			if (error.response && error.response.data) {
			} else {
				dispatch(console.log("No internet connection"));
			}
		})
	}
};




