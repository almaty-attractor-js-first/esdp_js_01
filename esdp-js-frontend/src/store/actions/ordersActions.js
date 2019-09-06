import axios from '../../axios-api'
import {UPDATE_CURRENT_ORDER, UPDATE_ORDERS} from "./actionTypes";
import store from "../configureStore";


export const updateOrders = orders => {
    return dispatch => {
        dispatch({type: UPDATE_ORDERS, orders});
    };
};

export const updateCurrentOrder = orderId => {
    const orders = store.getState().orders.orders;
    const currentOrder = orders.find(order => {return order.id === orderId});
    return dispatch => {
        dispatch({type: UPDATE_CURRENT_ORDER, currentOrder});
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

export const putUpdateOrder = (id, order) => {
    return dispatch => {
        return axios.put(`/orders/${id}`, order);
    }
};

export const changeStatus = (id, status) => {
    return dispatch => {
        axios.put(`/status/${id}`, {status: status}).then(()=>{
            dispatch(getOrders());
        });
    }
};


