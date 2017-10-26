import * as Redux from 'redux';
import todoReducers from './reducers';
import logging from 'redux-logger';

const { createStore, applyMiddleware } = Redux;

const thunk = (store) => (next) => (action) =>
  typeof action === 'function' ?
    action(store.dispatch) :
    next(action);


const configStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logging);
  }
  return createStore(
    todoReducers,
    applyMiddleware(...middlewares)
  );
};

export default configStore();