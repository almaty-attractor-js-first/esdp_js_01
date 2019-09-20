import axios from '../../axios-api'
import {QUERY_ERROR, UPDATE_CLIENT_ORDERS} from "./actionTypes";
import {push} from "connected-react-router";
import store from "../configureStore";
import {openSnack} from "./notificationsActions";


export const updateClientOrders = clientOrders => {
	return dispatch => {
		dispatch({type: UPDATE_CLIENT_ORDERS, clientOrders});
	};
};

const queryError = error => {
	return {type: QUERY_ERROR, error};
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
				dispatch(queryError(error.response.data));
				let errorMessage = store.getState().clientsReducer.queryError.message;
				dispatch(openSnack((errorMessage), 'warning'));
			})
	}};





