import * as Redux from 'redux';
import todoReducers from './reducers';
import promise from 'redux-promise'
import logging from 'redux-logger';

const { createStore, applyMiddleware } = Redux;


const configStore = () => {
  const middlewares = [promise];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logging);
  }
  return createStore(
    todoReducers,
    applyMiddleware(...middlewares)
  );
};

export default configStore();