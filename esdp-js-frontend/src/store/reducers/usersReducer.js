import {
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    registerError: null,
    loginError: null,
    user: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {...state, registerError: null};
        case REGISTER_USER_ERROR:
            return {...state, registerError: action.error};
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
