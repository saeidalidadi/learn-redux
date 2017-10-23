import v4 from 'uuid/v4';

export const addTodo = (value) => ({
	type: 'ADD_TODO',
	text: value,
	id: v4()
});

export const toggleTodo = (id) => ({
	type: 'TOGGLE_TODO',
	id
});

export const setVisibilityFilter = (filter) => ({
	type: 'SET_VISIBILITY_FILTER',
	filter
});