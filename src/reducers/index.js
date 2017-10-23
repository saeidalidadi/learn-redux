import * as Redux from 'redux';
import todos from './todos';
import visibilityFilter from './visibility-filter';



const { combineReducers } = Redux;
const todoReducers = combineReducers({
	todos,
	visibilityFilter
});

export default todoReducers;
