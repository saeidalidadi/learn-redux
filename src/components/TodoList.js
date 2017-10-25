import React from 'react';
import Todo from './Todo';

const TodoList = ({
  todos,
  onTodoClick
}) => {
  return (
    <ul>
      {todos.map(t =>
        <Todo
          key={t.id}
          onClick={() => onTodoClick(t.id)}
          {...t}
        />
      )}
    </ul>
  )
};

export default TodoList;
