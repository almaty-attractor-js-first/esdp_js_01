import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from 'history';
import {routerMiddleware, connectRouter} from 'connected-react-router';

import ordersReducer from './reducers/orders';
import usersReducer from "./reducers/users";
import newOrderReducer from "./reducers/newOrderReducer";
import {loadState, saveState} from "./localStorage";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  orders: ordersReducer,
  users: usersReducer,
  newOrder: newOrderReducer,
  router: connectRouter(history)
});


const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
  saveState({
    users: store.getState().users,
    newOrder: store.getState().newOrder,
    orders: store.getState().orders,
  });
});

export default store;
