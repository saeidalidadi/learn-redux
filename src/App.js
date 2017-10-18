import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as expect from 'expect';

const Counter = ({ value, onIncrement, onDecrement }) =>
  (
    <div>
      <h1>{value}</h1>
      <button onClick={onIncrement}>INC</button>
      <button onClick={onDecrement}>DEC</button>
    </div>
  );

class App extends Component {
  render() {
    const store = this.props.store;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Counter value={store.getState()}
                 onIncrement={() =>
                   store.dispatch({ type: 'INCREMENT'})
                 }
                 onDecrement={() =>
	                 store.dispatch({ type: 'DECREMENT'})
                 }
        />
      </div>
    );
  }
}

export default App;
