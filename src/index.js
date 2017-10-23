import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import { store } from './config-store';

ReactDOM.render(
	<Root store={store}/>,
	document.getElementById('root')
);


registerServiceWorker();



