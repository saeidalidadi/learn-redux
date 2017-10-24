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

const fakeDatabase = {
  todos: [{
    text: 'new todo',
    id: v4(),
    completed: false
  },
  {
    text: 'new new todo',
    id: v4(),
    completed: false
  }]
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
  delay(500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'completed':
        return fakeDatabase.filter(t => t.completed);
      case 'active':
        return fakeDatabase.filter(t => !t.completed)
      default:
        return new Error('not found')
    }
  });