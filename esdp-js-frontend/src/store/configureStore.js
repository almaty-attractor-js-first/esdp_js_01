import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from 'history';
import {routerMiddleware, connectRouter} from 'connected-react-router';

import ordersReducer from './reducers/orders';
import statusesReducer from './reducers/statusesReducer';
import cleaningTypesReducer from './reducers/cleaningTypesReducer';
import usersReducer from "./reducers/users";
import newOrderReducer from "./reducers/newOrderReducer";
import workersReducer from "./reducers/workersReducer";
import {loadState, saveState} from "./localStorage";
import axios from '../axios-api';
import {logoutUser} from "./actions/usersActions";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  orders: ordersReducer,
  users: usersReducer,
  workersReducer: workersReducer,
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
  if (!errorResponse.success) {
      store.dispatch(logoutUser());
      // store.dispatch(push("/login")); // @TODO Переводить на страницу логина, добавить отметку оставать онлайн. Реализовать с помощью jwt
      
      return Promise.reject(error);
  }
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
