import axios from '../../axios-api'
import {SET_LOADING, UPDATE_CURRENT_ORDER, UPDATE_ORDERS} from "./actionTypes";
import store from "../configureStore";
import {openSnack} from "./notificationsActions";

const setLoading = (loading) => {
    return dispatch => {
        dispatch({type: SET_LOADING, loading});
        console.log('LOADING...');
    };
};

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
        return axios.get("/orders").then(response => {
            let data = response.data;
            dispatch(updateOrders(data));
            return response;
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
        dispatch(setLoading(true));
        return axios.put(`/orders/${id}`, order )
            .then(res => {
                dispatch(openSnack(res.data.message, 'info'));
                dispatch(setLoading(false));
                dispatch(getOrders());
            }).catch((error) => {
                dispatch(openSnack(error.message, 'error'));
                dispatch(setLoading(false));
            });
    }
};

export const changeStatus = (id, status) => {
    return dispatch => {
        axios.put(`/status/${id}`, {status: status})
            .then((res)=>{
                dispatch(getOrders());
                dispatch(openSnack(res.message, 'info'));
            })
            .catch((error) => dispatch(openSnack(error.message, 'error')));
    }
};


