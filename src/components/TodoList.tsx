import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, deleteTodo, updateTodo, toggleTodo, setFilter, setSort }) {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className="TodoList">
      <div className="filters">
        <label htmlFor="filter">Filter by:</label>
        <select id="filter" onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" onChange={handleSortChange}>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;