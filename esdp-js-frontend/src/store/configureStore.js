import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from 'history';
import {routerMiddleware, connectRouter} from 'connected-react-router';

import notificationsReducer from './reducers/notificationsReducer';
import ordersReducer from './reducers/ordersReducer';
import statusesReducer from './reducers/statusesReducer';
import cleaningTypesReducer from './reducers/cleaningTypesReducer';
import usersReducer from "./reducers/usersReducer";
import newOrderReducer from "./reducers/newOrderReducer";
import workersReducer from "./reducers/workersReducer";
import clientsReducer from "./reducers/clientsReducer";
import {loadState, saveState} from "./localStorage";
import axios from '../axios-api';
import {logoutUser} from "./actions/usersActions";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  orders: ordersReducer,
  users: usersReducer,
  workersReducer: workersReducer,
  clientsReducer: clientsReducer,
  newOrder: newOrderReducer,
  statusesReducer: statusesReducer,
  cleaningTypesReducer: cleaningTypesReducer,
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
    workersReducer: store.getState().workersReducer,
    newOrder: store.getState().newOrder,
    orders: store.getState().orders,
  });
});

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
