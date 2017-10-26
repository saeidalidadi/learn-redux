import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getVisibleTodos, getIsFetching } from "../reducers";
import {toggleTodo, fetchTodos, requestTodos } from "../actions";
import TodoList from './TodoList';


class VisibleTodoList extends Component {
  componentWillMount() {
   this.fetchData();
  }
  fetchData() {
    const { filter, requestTodos, fetchTodos } = this.props;
    requestTodos(filter);
    fetchTodos(filter);
  }
  componentDidUpdate(prevProps) {
    const filter = this.props.filter;
    if (filter !== prevProps.filter) {
      this.fetchData();
    }
  }
  render() {
    const { toggleTodo, todos, isFetching } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    return (
      <TodoList
        onTodoClick={toggleTodo}
        todos={todos}
      />
    )
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos:
      getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  }
};

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { toggleTodo, requestTodos, fetchTodos }
)(VisibleTodoList));


export default VisibleTodoList;