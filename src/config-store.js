import * as Redux from 'redux';
import { loadState, saveState } from './local-storage';
import { throttle } from 'lodash';
import todoReducers from './reducers';

const { createStore } = Redux;


const addLoggingToDispatch = (store) =>{
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
  const store = createStore(todoReducers, loadState());
  store.subscribe(throttle(() =>
    saveState({
      todos: store.getState().todos
    })
  ), 1000);

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }
  return store;
};

export default configStore();