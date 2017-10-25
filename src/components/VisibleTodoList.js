import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getVisibleTodos } from "../reducers";
import {toggleTodo, fetchTodos } from "../actions";
import TodoList from './TodoList';


class VisibleTodoList extends Component {
  componentWillMount() {
   this.fetchData();
  }
  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter)
  }
  componentDidUpdate(prevProps) {
    const filter = this.props.filter;
    if (filter !== prevProps.filter) {
      this.fetchData();
    }
  }
  render() {
    const { toggleTodo, ...rest } = this.props;
    return (
      <TodoList
        onTodoClick={toggleTodo}
        {...rest}
      />
    )
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos:
      getVisibleTodos(state, filter),
    filter
  }
};

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { toggleTodo, fetchTodos }
)(VisibleTodoList));


export default VisibleTodoList;