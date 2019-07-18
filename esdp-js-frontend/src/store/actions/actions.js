import {FETCH_ORDERS_SUCCESS} from "./actionTypes";
import axios from '../../axios-api';

export const fetchOrdersSuccess = products => {
    return {type: FETCH_ORDERS_SUCCESS, products};
};

export const fetchOrders = () => {
    return (dispatch) => {
        axios.get('/orders').then(response => {
            dispatch(fetchOrdersSuccess(response.data));
        })
    }
};

