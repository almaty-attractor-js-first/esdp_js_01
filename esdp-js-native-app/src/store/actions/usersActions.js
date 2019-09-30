import axios from "../../axios-api";
import { Actions } from 'react-native-router-flux';
import {
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER
} from "./action-types";


const loginUserSuccess = (user) => {
    console.log('login user success');
    return {type: LOGIN_USER_SUCCESS, user};
};
const loginUserError = (error) => {
    return {type: LOGIN_USER_ERROR, error};
};

export const loginUser = userData => {
    console.log(userData);
    userData.phone = userData.phone.replace(/[^0-9]/g, '');
    console.log(userData);
    return dispatch => {
        axios.post("/workers/sessions", userData)
            .then(
                response => {
                    if (response.data) {
                        dispatch(loginUserSuccess(response.data));
                        console.log(response);
                        console.log('got responce');
                        Actions.Orders();
                    }

                },
                error => {
                    console.log(error.response.data);
                    if (error.response && error.response.data) {
                        dispatch(loginUserError(error.response.data));
                    } else {
                        dispatch(loginUserError({global: "Нет подключения"}));
                    }
                }
            ).catch((err) => console.log('err', err));
    }
};

export const logoutUser = () => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = {
            Authorization: token
        };
        axios.delete("/workers/sessions", {headers}).then(response => {
            dispatch({type: LOGOUT_USER});
        });
    }
};

