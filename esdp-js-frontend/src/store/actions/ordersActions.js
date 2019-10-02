import axios from '../../axios-api'
import {GET_TOTAL_ORDERS_COUNT, SET_LOADING, UPDATE_CURRENT_ORDER, UPDATE_ORDERS} from "./actionTypes";
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

export const getTotalOrders = () => {
    return dispatch => {
        return axios.get('/orders/total')
            .then(res => {
                const total = res.data;
                dispatch({type: GET_TOTAL_ORDERS_COUNT, total});
            })
    }
};

export const getOrders = (perPage, page) => {
    console.log(perPage, page);
    return dispatch => {
        return axios.get(perPage || page ? `/orders/?perPage=${perPage}&page=${page}` : '/orders/?perPage=10&page=0')
            .then(response => {
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
            .then(response => {
                dispatch(openSnack(response.data.message, 'info'));
                dispatch(setLoading(false));
                dispatch(getOrders());
                return response;
            }).catch((error) => {
                console.log(error);
                dispatch(openSnack(error.message, 'error'));
                dispatch(setLoading(false));
            });
    }
};


