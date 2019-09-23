import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from 'history';
import {routerMiddleware } from 'connected-react-router';

import ordersReducer from './reducers/ordersReducer';
import usersReducer from "./reducers/usersReducer";
import axios from '../axios-api';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    orders: ordersReducer,
    users: usersReducer
});


const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancers);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const errorResponse = error.response.data;
        const user = store.getState().users.user;
        if (user && errorResponse.message === "Token is not valid") {
            console.log(error.response);
            store.dispatch(logoutUser());
            // @TODO Переводить на страницу логина, добавить отметку оставаться онлайн. Реализовать с помощью jwt
        }
        return Promise.reject(error);
    });

axios.interceptors.request.use(config => {
    try {
        config.headers['authorization'] = store.getState().users.user.token;
    } catch {
        // do nothing
    }
    return config
});


export default store;
