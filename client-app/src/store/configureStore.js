
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from '../reducers';

export default function (initialState) {

  const rootReducer = combineReducers(reducers);

  return createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  );

};
