import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTodos = [...todos, { text: newTodo, completed: false, date: new Date() }]
      setNewTodo('');
      handleSortByCompletion(newTodos)
    }
  };

  const handleSortByCompletion = (todos) => {
    const newTodos = [...todos];
    newTodos.sort((a, b) => {
      if (a.completed === b.completed) {
        return b.date - a.date;
      }
      return a.completed ? 1 : -1;
    });
    setTodos(newTodos);
  }

  const handleSortByFilter = (todos) => {
    const newTodos = [...todos];
    newTodos.sort((a, b) => {
      if (a.completed === b.completed) {
        return b.date - a.date;
      }
      return a.completed ? 1 : -1;
    });
    setTodos(newTodos);
  }

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleToggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    handleSortByCompletion(newTodos)
  };

  const handleSortByDate = () => {
    const newTodos = [...todos];
    newTodos.sort((a, b) => b.date - a.date);
    setTodos(newTodos);
  };

  const handleFilter = (status) => {
    let newTodos;
    if (status === 'active') newTodos = todos.filter((todo) => !todo.completed);
    if (status === 'completed') newTodos = todos.filter((todo) => todo.completed);
    if (status === 'all') newTodos = todos;
    handleSortByFilter(newTodos)
  }

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      <br />
      <button onClick={() => handleFilter('all')}>전체</button>
      <button onClick={() => handleFilter('active')}>할일</button>
      <button onClick={() => handleFilter('completed')}>완료된일</button>
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
