import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import propTypes from 'prop-types';
import App from './App';
import './App.css';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route exact path='/(:filter)' component={App}/>
      </Router>
    </Provider>
  )
};


Root.propTypes = {
  store: propTypes.object.isRequired
}

export default Root;
