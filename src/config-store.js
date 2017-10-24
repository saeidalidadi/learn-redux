import * as Redux from 'redux';
import { loadState, saveState } from './local-storage';
import { throttle } from 'lodash';
import todoReducers from './reducers';

const { createStore } = Redux;

export const store = createStore(todoReducers, loadState());

store.subscribe(throttle(() =>
  saveState({
    todos: store.getState().todos
  })
), 1000);