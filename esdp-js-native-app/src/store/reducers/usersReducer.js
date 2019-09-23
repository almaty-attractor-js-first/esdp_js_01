import {
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER
} from "../actions/action-types";

const initialState = {
    registerError: null,
    loginError: null,
    user: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, loginError: null};
        case LOGIN_USER_ERROR:
            return {...state, loginError: action.error};
        case LOGOUT_USER:
            return {...state, user: null};
        default:
            return state;
    }
};

export default reducer;
