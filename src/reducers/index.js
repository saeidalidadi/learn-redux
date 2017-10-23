import * as Redux from 'redux';
import todoApp from './todo-app';
import { loadState, saveState } from './local-storage';
import { throttle } from 'lodash';
export * from './actions';


const { createStore } = Redux;


//export const store = createStore(todoApp, loadState());
export const store = createStore(todoApp, loadState());


store.subscribe(throttle(() =>
	saveState({
		todos: store.getState().todos
	})
), 1000);