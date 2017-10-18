import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
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
	ReactDOM.render(<App store={store}/>, document.getElementById('root'));
};

store.subscribe(render);
render();


registerServiceWorker();



