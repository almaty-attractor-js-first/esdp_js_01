import axios from "../../axios-api";
import {push} from "connected-react-router";
import {openSnack} from "./notificationsActions";
import store from "../configureStore";
import {
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
} from "./actionTypes";

const registerUserSuccess = () => {
    return {type: REGISTER_USER_SUCCESS};
};
const registerUserError = error => {
    return {type: REGISTER_USER_ERROR, error};
};
export const registerUser = userData => {
    userData.phone = userData.phone.replace(/[^0-9]/g, '');
    return dispatch => {
        axios.post("/workers", userData)
            .then(
                response => {
                    dispatch(registerUserSuccess());
                    dispatch(push("/"));
                },
                error => {
                    if (error.response.data) {
                        dispatch(registerUserError(error.response.data));
                        let errorMessage = store.getState().users.registerError.message;
                        dispatch(openSnack((errorMessage), 'error'));
                    } else {
                        dispatch(registerUserError({global: "Нет подключения"}));
                        let errorMessage = store.getState().users.registerError.message;
                        dispatch(openSnack((errorMessage), 'error'));
                    }
                }
            )
    }
};
const loginUserSuccess = (user) => {
    return {type: LOGIN_USER_SUCCESS, user};
};
const loginUserError = (error) => {
    return {type: LOGIN_USER_ERROR, error};
};
export const loginUser = userData => {
    userData.phone = userData.phone.replace(/[^0-9]/g, '');
    return dispatch => {
        axios.post("/workers/sessions", userData)
            .then(
                response => {
                    if (response.data) {
                        dispatch(loginUserSuccess(response.data));
                        dispatch(push("/"));
                        dispatch(openSnack((`Привет ${response.data.firstName}!`), 'info'));
                    }

                },
                error => {
                    if (error.response && error.response.data) {
                        dispatch(loginUserError(error.response.data));
                        let errorMessage = store.getState().users.loginError.message;
                        dispatch(openSnack((errorMessage), 'error'));
                    } else {
                        dispatch(loginUserError({global: "Нет подключения"}));
                        let errorMessage = store.getState().users.loginError.message;
                        dispatch(openSnack((errorMessage), 'error'));
                    }
                }
            ).catch((err) => console.log('err', err));
    }
};
export const logoutUser = () => {
    return (dispatch) => {
        axios.delete("/workers/sessions").then(response => {
            dispatch({type: LOGOUT_USER});
            dispatch(openSnack('Сессия завершена', 'info'));
            dispatch(push("/"));
        });
    }
};
export const getSystemRoles = () => {
    return dispatch => {
        axios.get("/workers/roles").then((roles) => {
            let data = roles.data;
            dispatch({type: 'FETCH_ROLES', data});
        })
    }
};

