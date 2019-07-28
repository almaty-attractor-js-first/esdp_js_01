import React from 'react';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {history} from './store/configureStore';
import store from './store/configureStore';
import {ConnectedRouter} from "connected-react-router";

const app = (
  <Provider store={store}>
      <ConnectedRouter history={history}>
          <App/>
      </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'))

serviceWorker.unregister();
