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
        text: newTodo, 
        completed: false, 
        id: Date.now()
      };
      addTodo(todo);
      setNewTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={newTodo} onChange={handleInputChange} placeholder="Add a new to-do..." />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;