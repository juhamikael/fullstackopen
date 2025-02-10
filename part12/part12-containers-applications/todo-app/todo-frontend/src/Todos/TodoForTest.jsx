import React from 'react';

const Todo = ({ text, done }) => (
  <div className={`todo-item ${done ? 'completed' : ''}`}>
    <p>{text}</p>
  </div>
);

export default Todo;