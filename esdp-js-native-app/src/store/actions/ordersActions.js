import axios from '../../axios-api'
import {UPDATE_ORDERS} from "./action-types";
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



