import axios from '../../axios-api'
import {GET_STATUSES, UPDATE_CURRENT_ORDER, UPDATE_ORDERS} from "./actionTypes";
import store from "../configureStore";
// import {push} from "connected-react-router";


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

export const getStatusesFromServer = (array) => {
    return dispatch => {
        dispatch({type: GET_STATUSES, array});
    }
};
export const getStatuses = () => {
    return dispatch => {
        axios.get("/statuses").then(response => {
            let data = response.data;
            dispatch(getStatusesFromServer(data));
        },error => {
            if (error.response && error.response.data) {
            } else {
                dispatch(console.log("No internet connection"));
            }
        })
    }
};

export const updateOrderStatus = (id, status) => {
    const orderId = id;
    const newOrderStatus = status[id];
    const data = {status: newOrderStatus};
    const orders = store.getState().orders.orders;
    const index = orders.findIndex((order) => {return order.id === orderId});
    // console.log(orders[index]);
    orders[index] = {...orders[index], ...data};
    return dispatch => {
        console.log(orders);
        dispatch({type: UPDATE_ORDERS, orders});
        axios.put(`/orders/${orderId}`, orders[index]);
    }
};



