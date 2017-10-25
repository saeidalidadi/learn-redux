import * as Redux from 'redux';
import todoReducers from './reducers';

const { createStore } = Redux;


const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(rawDispatch)
    }
    return rawDispatch(action);
  }
}

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: gray', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
};


const configStore = () => {
  const store = createStore(todoReducers);

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.dispatch = addPromiseSupportToDispatch(store);
  return store;
};

export default configStore();