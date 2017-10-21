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

const Link = ({
  active,
  children,
  onClick
}) => {
	if(active) {
		return <span>{children}</span>
	}
	return (
    <a href="#"
       onClick={(e) => {
         e.preventDefault();
         onClick();
       }}

    >{children}</a>
	);
};

class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const {filter, children} = this.props;
    const state = store.getState();
    return (
      <Link
        active={filter === state.visibilityFilter}
        onClick={() =>
	        store.dispatch({
		        type: 'SET_VISIBILITY_FILTER',
		        filter
	        })
        }>
        {children}
      </Link>
    )
  }
}

const Footer = () => {
  return (
    <p>
      show: {''}
      <FilterLink
        filter="SHOW_ALL"
       >all
      </FilterLink> {' '}
      <FilterLink
        filter="SHOW_COMPLETED"
        >completed
      </FilterLink>{' '}
      <FilterLink
        filter="SHOW_ACTIVE">active
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
        <Footer />
      </div>
    );
  }
}

export default App;
