import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState<any>([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('asc');

  const LOCAL_STORAGE_KEY = "todo-list";

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const updateTodo = (id, updatedTodo) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos[index] = updatedTodo;
    handleSortByCompletion(newTodos)
    setTodos(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const filterTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'active':
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  const sortTodos = (todos) => {
    switch (sort) {
      case 'asc':
        return todos.sort((a, b) => a.date - b.date);
      case 'desc':
        return todos.sort((a, b) => b.date - a.date);
      default:
        return todos;
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
  };
  
  const filteredTodos = filterTodos();
  const sortedTodos = sortTodos(filteredTodos);

  return (
    <div className="App">
      <h1>Todo-List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={sortedTodos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        toggleTodo={toggleTodo}
        setFilter={setFilter}
        setSort={setSort}
      />
    </div>
  );
}

export default App;
