import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './index.css';
import {fetchTodos} from './reducers';
import registerServiceWorker from './registerServiceWorker';
import store from './config-store';

fetchTodos('all').then(result => {
	console.log(result);
});

ReactDOM.render(
	<Root store={store}/>,
	document.getElementById('root')
);


registerServiceWorker();



