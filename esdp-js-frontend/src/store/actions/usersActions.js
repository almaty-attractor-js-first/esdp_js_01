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
    CONNECTED_USERS,
    USER_LOGGED_IN,
    USER_LOGGED_OUT

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
                        dispatch(openSnack((`Привет ${response.data.firstName}!`), 'success'));
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

export const fetchConnectedUsers = users => ({
    type: CONNECTED_USERS, users
});
export const loggedIn = user => ({
    type: USER_LOGGED_IN, user
});
export const loggedOut = (users) => ({
    type: USER_LOGGED_OUT, users
});

export const logoutUser = () => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = {
            Authorization: token
        };
        axios.delete("/workers/sessions", {headers}).then(response => {
            dispatch({type: LOGOUT_USER});
            dispatch(openSnack('Сессия завершена', 'info'));
            dispatch(push("/"));
        });
    }
};

