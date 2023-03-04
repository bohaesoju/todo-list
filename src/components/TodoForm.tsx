import { useState } from 'react';
import crypto from "crypto-js";

function TodoForm({ addTodo }) {
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const encryptTodoText = crypto.AES.encrypt(JSON.stringify(newTodo), "todo-list-secret-key").toString()
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
      <input type="text" value={newTodo} onChange={handleInputChange} placeholder="이 곳에 할 일을 입력하고 엔터를 눌러주세요" />
    </form>
  );
}

export default TodoForm;