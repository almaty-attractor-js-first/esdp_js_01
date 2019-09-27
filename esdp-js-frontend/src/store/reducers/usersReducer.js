import {
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    CONNECTED_USERS,
    USER_LOGGED_IN,
    USER_LOGGED_OUT

} from "../actions/actionTypes";

const initialState = {
    registerError: null,
    loginError: null,
    user: null,
    users: []
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
        case CONNECTED_USERS:
            return {...state, users: action.users};
        case USER_LOGGED_IN:
            let users = [...state.users];
            users.push(action.user);
            return {...state, users};
        case USER_LOGGED_OUT:
            return {...state, users: action.users};
        case LOGOUT_USER:
            return {...state, user: null};
        default:
            return state;
    }
};

export default reducer;
