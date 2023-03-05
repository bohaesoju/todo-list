import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import './App.css';

export type TodoProps = {
  text: string
  completed: boolean;
  id: number;
}

function App() {
  const storedTodos: TodoProps[] = JSON.parse(localStorage.getItem('todos') || '[]');
  const [todos, setTodos] = useState(storedTodos);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (todo: TodoProps): void => {
    setTodos([...todos, todo]);
  };

  const handleUpdateTodo = (id: number, updatedTodo: TodoProps) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos[index] = updatedTodo;
    setTodos(newTodos);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo: TodoProps) => {
        if (todo.id === id) return { ...todo, completed: !todo.completed };
        return todo;
      })
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo: TodoProps) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo: TodoProps) => {
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
      <div className="TodoWrap">
        <h1>Todos</h1>
        <TodoForm onAddTodo={handleAddTodo} />
        <div className='ButtonWrap'>
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('active')}>Active</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <ul>
          {sortedTodos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggleTodo={handleToggleTodo} 
              onUpdateTodo={handleUpdateTodo} 
              onDeleteTodo={handleDeleteTodo} 
            />
          ))}
        </ul>
      </div>
      <p className="explain">* 텍스트를 선택하면 수정이 가능합니다</p>
    </div>
  );
}

export default App;
