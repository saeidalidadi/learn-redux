import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      throw new Error('filter is not defined')
  }
};

const Header = () =>
  (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
  );

const FilterLink = ({ filter, currentFilter,children }) =>{
  if(filter === currentFilter) {
    return <span>{children}</span>
  }
	return (
    <a href="#"
       onClick={() =>
			   store.dispatch({
				   type: 'SET_VISIBILITY_FILTER',
				   filter
			   })
		   }
    >{children}</a>
	);
}

const Todo = ({
  text,
  onClick,
  completed
}) => {
  return (
    <li onClick={onClick}
        style={{
		      textDecoration: completed ? 'line-through' : 'none'
	      }}>
		  {text}
    </li>
  )
};

const TodoList = ({
  todos,
  onTodoClick
}) => {
  return (
    <ul>
		  {todos.map(t =>
        <Todo
          key={t.id}
          onClick={() => onTodoClick(t.id)}
          {...t}/>
		  )}
    </ul>
  )
}

let nextId = 0;
let store;
class App extends Component {
  render() {
    store = this.props.store;
    const { todos, visibilityFilter } = store.getState();
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);
    return (
      <div className="App">
        <Header />
        <input ref={node => this.input = node}/>
        <button onClick={() => {
	        if(this.input.value !== '') {
		        store.dispatch({
			        type: 'ADD_TODO',
			        text: this.input.value,
			        id: nextId++
		        });
            this.input.value = ''
          }
        }}>Add todo</button>
        <TodoList
          todos={visibleTodos}
          onTodoClick={(id) =>
	          store.dispatch({
		          type: 'TOGGLE_TODO',
		          id
	          })
          }
        />
        <p>
          show: {''}
          <FilterLink
            filter="SHOW_ALL"
            currentFilter={visibilityFilter}>all
          </FilterLink> {' '}
          <FilterLink
            filter="SHOW_COMPLETED"
            currentFilter={visibilityFilter}>completed
          </FilterLink>{' '}
          <FilterLink
            filter="SHOW_ACTIVE"
            currentFilter={visibilityFilter}>active
          </FilterLink>{' '}
        </p>

      </div>
    );
  }
}

export default App;
