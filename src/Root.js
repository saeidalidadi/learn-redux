import React from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import {Provider} from 'react-redux';
import propTypes from 'prop-types';
import App from './App';
import './App.css';

const Root = ({ store }) => {
	return (
		<Provider store={store}>
			<Router>
				<Route exact path='/' component={App}/>
			</Router>
		</Provider>
	)
};


Root.propTypes = {
	store: propTypes.object.isRequired
}

export default Root;
