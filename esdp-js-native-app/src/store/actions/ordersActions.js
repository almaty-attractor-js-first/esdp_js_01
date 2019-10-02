import axios from '../../axios-api';
import {UPDATE_ORDERS, UPDATE_CURRENT_ORDER} from "./action-types";
import store from "../store-config";

export const updateOrders = orders => {
    return dispatch => {
        dispatch({type: UPDATE_ORDERS, orders});
    };
};

export const getOrders = () => {
    return dispatch => {
        axios.get("/orders").then(response => {
            let data = response.data;
            dispatch(updateOrders(data));
        },error => {
            if (error.response && error.response.data) {
            } else {
                dispatch(console.log("No internet connection"));
            }
        })
    }
};

export const getOrder = (id) => {
    return dispatch => {
        axios.get('/orders').then(response => {
            let data = response.data;
            //console.log(data);
            dispatch(updateCurrentOrder(id));
        },error => {
            if (error.response && error.response.data) {
            } else {
                dispatch(console.log("No internet connection"));
            }
        })
    }
};

export const updateCurrentOrder = orderId => {
    const orders = store.getState().orders.orders;
    const currentOrder = orders.find(order => {return order.id === orderId});
    return dispatch => {
        dispatch({type: UPDATE_CURRENT_ORDER, currentOrder});
    };
};
