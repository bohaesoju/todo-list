import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import './App.css';

function App() {
  const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
  const [todos, setTodos] = useState(storedTodos);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (id, updatedTodo) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos[index] = updatedTodo;
    setTodos(newTodos);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) return { ...todo, completed: !todo.completed };
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return false;
  });

  const getSortedTodos = () => {
    const newFilteredTodos = [...filteredTodos]
    return newFilteredTodos.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return b.id - a.id;
    })
  }
  
  const sortedTodos = getSortedTodos();

  return (
    <div className='App'>
      <h1>Todo-List</h1>
      <TodoForm addTodo={addTodo} />
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul>
        {sortedTodos.map((todo) => (
          <TodoItem key={todo.id} toggleTodo={toggleTodo} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
