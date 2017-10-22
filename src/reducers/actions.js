import v4 from 'uuid/v4';

export const addTodo = (value) => {
	return {
		type: 'ADD_TODO',
		text: value,
		id: v4()
	}
};

export const toggleTodo = (id) => {
	return {
		type: 'TOGGLE_TODO',
		id
	}

};

export const setVisibilityFilter = (filter) => {
	return {
		type: 'SET_VISIBILITY_FILTER',
		filter
	}
};