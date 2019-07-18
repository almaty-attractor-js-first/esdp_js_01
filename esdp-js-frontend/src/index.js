import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from 'history';
import {connectRouter, routerMiddleware, ConnectedRouter} from "connected-react-router";
import * as serviceWorker from './serviceWorker';
import axios from "./axios-api";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

import App from './App';
import ordersReducer from './store/reducers/orders';
import usersReducer from "./store/reducers/users";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createBrowserHistory();

const rootReducer = combineReducers({
    orders: ordersReducer,
    users: usersReducer,
    router: connectRouter(history)
});

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('user', serializedState);
    } catch (e) {
        console.log("Could not save user");
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('user');
        if(serializedState === null) {
            return;
        }
        return JSON.parse(serializedState);
    } catch {
        return undefined;
    }
};

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

axios.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch {
        // do nothing
    }

    return config;
});

store.subscribe(() => {
    const user = store.getState().users.user;
    saveToLocalStorage({
        users: {
            user: user
        }
    });
});

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
