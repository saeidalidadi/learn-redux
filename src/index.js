import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as Redux from 'redux';
import store from './reducers';


const render = () => {
	ReactDOM.render(<App store={store}/>, document.getElementById('root'));
};

store.subscribe(render);
render();


registerServiceWorker();



