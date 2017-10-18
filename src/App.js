import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as expect from 'expect';
import * as Redux from 'redux';




const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state -1;
    default:
      return state;
  }
};

const { createStore } = Redux;
const store = createStore(counter);


const render = () => {
	document.getElementById("store").innerText = store.getState()
};

store.subscribe(render);
render();
document.addEventListener('click', () => {
	store.dispatch({ type: 'INCREMENT'});
})

expect(
  counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect(
	counter(1, { type: 'INCREMENT' })
).toEqual(2);

expect(
	counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect(
	counter(1, { type: 'DECREMENT' })
).toEqual(0);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
