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

const AddTodo = ({
  onAddClick,
}) => {
  let input;
  return (
    <div>
      <input ref={node => input = node}/>
      <button
        onClick={() => {
		      onAddClick(input.value);
			    input.value = '';
		    }
	    }>Add todo</button>
    </div>
  )
};

const FilterLink = ({
  filter,
  currentFilter,
  children,
  onClick
}) => {
	if(filter === currentFilter) {
		return <span>{children}</span>
	}
	return (
    <a href="#"
       onClick={(e) => {
         e.preventDefault();
         onClick(filter);
       }}

    >{children}</a>
	);
};

const Footer = ({
  visibilityFilter,
  onFilterClick
}) => {
  return (
    <p>
      show: {''}
      <FilterLink
        filter="SHOW_ALL"
        currentFilter={visibilityFilter}
        onClick={onFilterClick}>all
      </FilterLink> {' '}
      <FilterLink
        filter="SHOW_COMPLETED"
        currentFilter={visibilityFilter}
        onClick={onFilterClick}>completed
      </FilterLink>{' '}
      <FilterLink
        filter="SHOW_ACTIVE"
        currentFilter={visibilityFilter}
        onClick={onFilterClick}>active
      </FilterLink>{' '}
    </p>
  )
};

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
        <AddTodo
          onAddClick={(value) => {
            if (value !== '') {
              store.dispatch({
                type: 'ADD_TODO',
                text: value,
                id: nextId++
              });
            }
          }}/>
        <TodoList
          todos={visibleTodos}
          onTodoClick={(id) =>
	          store.dispatch({
		          type: 'TOGGLE_TODO',
		          id
	          })
          }
        />
        <Footer
          visibilityFilter={visibilityFilter}
          onFilterClick={filter =>
		          store.dispatch({
			          type: 'SET_VISIBILITY_FILTER',
			          filter
		          })
          }/>
      </div>
    );
  }
}

export default App;
