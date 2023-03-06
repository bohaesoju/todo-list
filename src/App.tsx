import { useState, useEffect } from 'react';
import crypto from "crypto-js";
import styled from 'styled-components'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

export type TodoProps = {
  text: string
  completed: boolean;
  id: number;
}

function App() {
  const storedTodos: TodoProps[] = JSON.parse(localStorage.getItem('todos') || '[]');
  const todoListEncryptKey = "todo-list-encrypt-key";
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
    const newToggleTodos = todos.map((todo: TodoProps) => {
      if (todo.id === id) return { ...todo, completed: !todo.completed };
      return todo;
    })
    setTodos(newToggleTodos);
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo: TodoProps) => todo.id !== id));
  };

  const handleSaveTodo = () => {
    const newTodos = [...todos]
    const encryptTodos = newTodos.map((todo) => {
      return {
        ...todo,
        text: crypto.AES.encrypt(todo.text, todoListEncryptKey).toString()
      };
    });
    console.log('encryptTodos', encryptTodos)
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
    <Root>
      <Body>
        <Title>Todos</Title>
        <TodoForm onAddTodo={handleAddTodo} />
        <ButtonWrap>
          <Button selected={filter === 'all'} onClick={() => setFilter('all')}>All</Button>
          <Button selected={filter === 'active'} onClick={() => setFilter('active')}>Active</Button>
          <Button selected={filter === 'completed'} onClick={() => setFilter('completed')}>Completed</Button>
        </ButtonWrap>
        <TodoItemWrap>
          {sortedTodos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggleTodo={handleToggleTodo} 
              onUpdateTodo={handleUpdateTodo} 
              onDeleteTodo={handleDeleteTodo} 
            />
          ))}
        </TodoItemWrap>
      </Body>
      <Announcement>* 텍스트를 선택하면 수정이 가능합니다</Announcement>
      <SaveButton onClick={handleSaveTodo}>저장</SaveButton>
    </Root>
  );
}

const Root = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 0px 0px 20px;
    text-align: center;
  `

  const Body = styled.div`
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%);
    padding-top: 10px;
  `

  const Title = styled.h1`
    font-size: 50px;
    margin: 0 0 20px;
    color: rgba(175, 47, 47, 0.45);
  `

  const ButtonWrap = styled.div`
    padding: 10px 15px;
    border-bottom: 1px solid #e6e6e6;
  `

  const Button = styled.button<{ selected: boolean }>`
    padding: 3px 7px;
    color: #777;
    background: none;
    border: ${props => props.selected ? "1px solid rgba(175, 47, 47, 0.4)" : "none"};
    border-radius: 3px;
    font-size: 16px;
    margin-right: 5px;
    cursor: pointer;
  `
  
  const SaveButton = styled.button`
    padding: 6px 10px;
    color: black;
    background: white;
    border-radius: 3px;
    font-size: 16px;
    margin-right: 5px;
    cursor: pointer;
  `

  const TodoItemWrap = styled.ul`
    padding: 0;
  `

  const Announcement = styled.p`
    font-size: 14px;
    color: #777;
    padding: 0 20px;
    text-align: left;
  `

export default App;
