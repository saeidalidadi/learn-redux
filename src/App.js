import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import * as actions from './actions';


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


const mapStateToTodoListProps = (state) => {
	return {
		todos:
			getVisibleTodos(state.todos, state.visibilityFilter)
	}
};

const mapDispatchToTodoListProps = (dispatch) => {
	return {
		onTodoClick: (id) => {
			dispatch(actions.toggleTodo(id))
		}
	}
};

const VisibleTodoList = connect(
	mapStateToTodoListProps,
	mapDispatchToTodoListProps
)(TodoList);


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


const mapStateToLinkProps = (state, props) => {
	return {
		active: props.filter === state.visibilityFilter
	}
};

const mapDispatchToLinkProps = (dispatch, props) => {
	return {
		onClick: () =>
			dispatch(actions.setVisibilityFilter(props.filter))
	}
};

const FilterLink = connect(
	mapStateToLinkProps,
	mapDispatchToLinkProps
)(Link);

const Footer = ({ store }) => {
  return (
    <p>
      show: {''}
      <FilterLink
        filter="SHOW_ALL">all
      </FilterLink> {' '}
      <FilterLink
        filter="SHOW_COMPLETED">completed
      </FilterLink>{' '}
      <FilterLink
        filter="SHOW_ACTIVE">active
      </FilterLink>{' '}
    </p>
  )
};

const App = () =>
  (
    <div className="App">
      <Header />
      <AddTodo />
      <VisibleTodoList />
      <Footer/>
    </div>
  );

export default App;
