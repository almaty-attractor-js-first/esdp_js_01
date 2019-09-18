import axios from '../../axios-api'
import {UPDATE_CLIENT_ORDERS} from "./actionTypes";
import {push} from "connected-react-router";


export const updateClientOrders = clientOrders => {
	return dispatch => {
		dispatch({type: UPDATE_CLIENT_ORDERS, clientOrders});
	};
};

export const getClientOrders = (phone) => {
	phone = phone.replace(/[^0-9]/g, '');
	return dispatch => {
		axios.post('/clients', {phone})
			.then((response) => {
				if (response) {
					let data = response.data.orders;
					dispatch(updateClientOrders(data));
				}
			})
			.then(() => dispatch(push("/orders/current")))
			.catch(error => {
				console.log("Response error", error);
			})
	}};





