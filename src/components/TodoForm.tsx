import { useState } from 'react';
import { TodoProps } from '../App';
// import crypto from "crypto-js";

interface TodoFormProps {
	onAddTodo: (todo: TodoProps) => void
}

function TodoForm({ onAddTodo }: TodoFormProps) {
  const [newTodo, setNewTodo] = useState('');

  const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const encryptTodoText = crypto.AES.encrypt(JSON.stringify(newTodo), "todo-list-secret-key").toString()
    if (newTodo.trim() !== '') {
      const todo = {
        text: newTodo,
        completed: false, 
        id: Date.now()
      };
      onAddTodo(todo);
      setNewTodo('');
    }
  };

  return (
    <form onSubmit={handleAddTodoSubmit}>
      <input type="text" value={newTodo} onChange={handleTodoChange} placeholder="이 곳에 할 일을 입력하고 엔터를 눌러주세요" />
    </form>
  );
}

export default TodoForm;