import axios from '../../axios-api'
import {QUERY_ERROR, UPDATE_CLIENT_ORDERS, GET_CLIENTS} from "./actionTypes";
import {push} from "connected-react-router";
import store from "../configureStore";
import {openSnack} from "./notificationsActions";

export const setClients = (clients) => {
	return dispatch => {
		dispatch({type: GET_CLIENTS, clients});
	}
};


export const getClients = () => {
	return dispatch => {
		return axios.get("/clients")
			.then(response => {
				let clients = response.data;
				dispatch(setClients(clients));
				return response;
			},error => {
				if (error.response && error.response.data) {
				} else {
					dispatch(console.log("No internet connection"));
				}
			})
	}
};

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





