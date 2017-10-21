import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './reducers';

class Provider extends React.Component {
	getChildContext() {
		return {
			store: this.props.store
		}
	}
	render() {
		return this.props.children
	}
}

Provider.childContextTypes = {
	store: propTypes.object
};

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);


registerServiceWorker();



