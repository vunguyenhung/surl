import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
// import reducer from './reducers';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

// const store = createStore(
//   reducer,
//   applyMiddleware(...middleware),
// );

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
