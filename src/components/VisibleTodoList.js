import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getVisibleTodos } from "../reducers";
import {toggleTodo, receiveTodos} from "../actions";
import TodoList from './TodoList';
import { fetchTodos } from "../api";


class VisibleTodoList extends Component {
  componentWillMount() {
   this.fetchData();
  }
  fetchData() {
    const { filter, receiveTodos } = this.props;
    fetchTodos(filter).then(todos => {
      receiveTodos(filter, todos)
    })
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
  { toggleTodo, receiveTodos }
)(VisibleTodoList));


export default VisibleTodoList;