import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Header = () =>
  (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
  );

let nextId = 0;
class App extends Component {
  render() {
    const store = this.props.store;
    const todos = store.getState().todos;
    return (
      <div className="App">
        <Header/>
        <input ref={node => this.input = node}/>
        <button onClick={() => {
	        if(this.input.value !== '') {
		        store.dispatch({
			        type: 'ADD_TODO',
			        text: this.input.value,
			        id: nextId++
		        })
            this.input.value = ''
          }
        }}>Add todo</button>
        <ul>
          {todos.map(t =>
            <li key={t.id}
                onClick={() =>
	                store.dispatch({
		                type: 'TOGGLE_TODO',
		                id: t.id
	                })
                }
            style={{
              textDecoration: t.completed ? 'line-through' : 'none'
            }}>
              {t.text}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
