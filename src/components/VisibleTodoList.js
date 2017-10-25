import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getVisibleTodos } from "../reducers";
import {toggleTodo} from "../actions";
import TodoList from './TodoList';
import { fetchTodos } from "../api";


class VisibleTodoList extends Component {
  componentWillMount() {
    fetchTodos(this.props.filter).then(todos =>
      console.log(todos)
    )
  }
  componentDidUpdate(prevProps) {
    const filter = this.props.filter;
    if (filter !== prevProps.filter) {
      fetchTodos(filter).then(todos => {
        console.log(todos);
      })
    }
  }
  render() {
    return <TodoList {...this.props}/>
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
  { onTodoClick: toggleTodo }
)(VisibleTodoList));


export default VisibleTodoList;