import * as Redux from 'redux';
import todos from './todos';


const { combineReducers } = Redux;
const todoReducers = combineReducers({
	todos
});

export default todoReducers;
