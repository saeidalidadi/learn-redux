import * as Redux from 'redux';
import todoReducers from './reducers';

const { createStore } = Redux;


const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next)
  }
  return next(action);
};


const logging = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('%c prev state', 'color: gray', store.getState());
  console.log('%c action', 'color: blue', action);
  const returnValue = next(action);
  console.log('%c next state', 'color: gray', store.getState());
  console.groupEnd(action.type);
  return returnValue;
}

const wrapDispatchWithMiddlewares = (store, middlewares) =>
  middlewares.slice().reverse().forEach(middleware =>
    store.dispatch = middleware(store)(store.dispatch)
  )

const configStore = () => {
  const store = createStore(todoReducers);
  const middlewares = [promise];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logging);
    //store.dispatch = addLoggingToDispatch(store);
  }

  //store.dispatch = addPromiseSupportToDispatch(store);
  wrapDispatchWithMiddlewares(store, middlewares);
  return store;
};

export default configStore();