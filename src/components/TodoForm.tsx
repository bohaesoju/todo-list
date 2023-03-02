import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function TodoForm({ addTodo }) {
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      const todo = {
        id: uuidv4(),
        text: newTodo,
        completed: false,
        date: Date.now(),
      };
      addTodo(todo);
      setNewTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={newTodo} onChange={handleInputChange} placeholder="이곳에 할 일을 입력해주세요" />
    </form>
  );
}

export default TodoForm;