import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (!inputValue.trim()) {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date(),
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleToggleCompleted = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const sortTodos = (a, b) => {
    if (a.completed && !b.completed) {
      return 1;
    }

    if (!a.completed && b.completed) {
      return -1;
    }

    return b.createdAt.getTime() - a.createdAt.getTime();
  };

  const sortedTodos = todos.slice().sort(sortTodos);

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {sortedTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id)}
            />
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;