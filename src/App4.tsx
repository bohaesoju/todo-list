import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false, date: new Date() }]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleToggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleSortByDate = () => {
    const newTodos = [...todos];
    newTodos.sort((a, b) => b.date - a.date);
    setTodos(newTodos);
  };

  const handleSortByCompletion = () => {
    const newTodos = [...todos];
    newTodos.sort((a, b) => {
      if (a.completed === b.completed) {
        return b.date - a.date;
      }
      return a.completed ? 1 : -1;
    });
    setTodos(newTodos);
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      <br />
      <button onClick={handleSortByDate}>Sort by date</button>
      <button onClick={handleSortByCompletion}>
        Sort by completion status
      </button>
      <br />
      {todos.map((todo, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleComplete(index)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => handleDeleteTodo(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
