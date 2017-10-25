import * as Redux from 'redux';
import todos, * as fromTodos from './todos';
import v4 from 'uuid/v4';

const { combineReducers } = Redux;
const todoReducers = combineReducers({
	todos
});

export default todoReducers;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);

