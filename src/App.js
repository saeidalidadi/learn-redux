import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FilterLink } from './components';
import logo from './logo.svg';
import * as actions from './actions';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(t => t.completed);
    case 'active':
      return todos.filter(t => !t.completed);
    default:
      throw new Error('filter is not defined or unknown: ' + filter)
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
          {...t}
        />
		  )}
    </ul>
  )
}


let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => input = node}/>
      <button
        onClick={() => {
          if (input.value !== '') {
            dispatch(actions.addTodo(input.value));
          }
			    input.value = '';
		    }
	    }>Add todo</button>
    </div>
  )
};

AddTodo = connect()(AddTodo);


const mapStateToTodoListProps = (state, { params }) => {
	return {
		todos:
			getVisibleTodos(state.todos, params.filter ? params.filter : 'all')
	}
};

const mapDispatchToTodoListProps = (dispatch) => {
	return {
		onTodoClick: (id) => {
			dispatch(actions.toggleTodo(id))
		}
	}
};

const VisibleTodoList = withRouter(connect(
	mapStateToTodoListProps,
	mapDispatchToTodoListProps
)(TodoList));


const Footer = () => {
  return (
    <p>
      show: {''}
      <FilterLink
        filter="all">all
      </FilterLink> {' '}
      <FilterLink
        filter="completed">completed
      </FilterLink>{' '}
      <FilterLink
        filter="active">active
      </FilterLink>{' '}
    </p>
  )
};

const App = ({ params }) => {
  return (
    <div className="App">
      <Header />
      <AddTodo />
      <VisibleTodoList filter={params.filter}/>
      <Footer/>
    </div>
  );
}

export default App;
