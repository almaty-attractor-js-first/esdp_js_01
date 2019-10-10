import axios from '../../axios-api'
import {
    SET_ORDER_ITEMS,
    GET_TOTAL_ORDERS_COUNT,
    SET_LOADING,
    UPDATE_CURRENT_ORDER,
    UPDATE_ORDERS,
    SET_CHANGED_ORDER_ITEMS
} from "./actionTypes";
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

export const setOrderItems = orders => {
    return dispatch => {
        dispatch({type: SET_ORDER_ITEMS, orders});
    };
};

export const updateCurrentOrder = orderId => {
    return dispatch => {
        return axios.get(`/orders/${orderId}`)
        .then(res => {
            const currentOrder = res.data;
            dispatch({type: UPDATE_CURRENT_ORDER, currentOrder});
        },error => {
            if (error.response && error.response.data) {
            } else {
                dispatch(console.log("No internet connection"));
            }
        })
    }
};

export const getTotalOrders = () => {
    return dispatch => {
        return axios.get('/orders/total')
            .then(res => {
                const total = res.data;
                dispatch({type: GET_TOTAL_ORDERS_COUNT, total});
            },error => {
                if (error.response && error.response.data) {
                } else {
                    dispatch(console.log("No internet connection"));
                }
            })
    }
};

export const setChangedOrderItems = (JSONString) => {
    return dispatch => {
        dispatch({type: SET_CHANGED_ORDER_ITEMS, JSONString});
    }
};

export const getOrders = (perPage, page) => {
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

export const getOrderItems = (id) => {
    return dispatch => {
        return axios.get(`/orders/${id}/items`)
            .then(response => {
                let data = response.data;
                dispatch(setOrderItems(data));
                const JSONString = JSON.stringify(data);
                dispatch(setChangedOrderItems(JSONString));
                return response;
        },error => {
            if (error.response && error.response.data) {
            } else {
                dispatch(console.log("No internet connection"));
            }
        })
    }
};

export const updateCurrentOrderItems = (id, data) => {
    return dispatch => {
        return axios.put(`/orders/${id}/items`, data)
            .then(response => {
                return response;
        }
        ,error => {
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
                dispatch(getOrders()).then(() => {
                    dispatch(updateCurrentOrder(id));
                });
                dispatch(setLoading(false));
                return response;
            })
            .catch((error) => {
                console.log(error);
                dispatch(openSnack(error.message, 'error'));
                dispatch(setLoading(false));
            });
    }
};


