import React, { Component } from 'react';
import {connect}  from 'react-redux';
import { FilterLink } from './components';
import { VisibleTodoList } from './components'
import logo from './logo.svg';
import * as actions from './actions';

const Header = () =>
  (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
  );


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
