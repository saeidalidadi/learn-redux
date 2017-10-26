import v4 from 'uuid/v4';
import * as api from '../api';

const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
});

const receiveTodos = (filter, response) => ({
	type: 'RECEIVE_TODOS',
	filter,
	response
});

export const fetchTodos = (filter) => (dispatch) => {
  dispatch(requestTodos(filter));
  return api.fetchTodos(filter).then(todos =>
    dispatch(receiveTodos(filter, todos))
  );
}

export const addTodo = (value) => ({
	type: 'ADD_TODO',
	text: value,
	id: v4()
});

export const toggleTodo = (id) => ({
	type: 'TOGGLE_TODO',
	id
});
