import v4 from 'uuid/v4';


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
        return fakeDatabase.todos.filter(t => t.completed);
      case 'active':
        return fakeDatabase.todos.filter(t => !t.completed)
      default:
        return new Error('not found')
    }
  });