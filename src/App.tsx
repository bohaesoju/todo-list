import { useState, useEffect } from 'react';
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
    <AppWrapper>
      <Wrapper>
        <Title>Todos</Title>
        <TodoForm onAddTodo={handleAddTodo} />
        <ButtonWrap>
          <Button onClick={() => setFilter('all')}>All</Button>
          <Button onClick={() => setFilter('active')}>Active</Button>
          <Button onClick={() => setFilter('completed')}>Completed</Button>
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
      </Wrapper>
      <Announcement>* 텍스트를 선택하면 수정이 가능합니다</Announcement>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 0px;
    text-align: center;
  `

  const Wrapper = styled.div`
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%);
    padding-top: 10px;
  `

  const Title = styled.h1`
    font-size: 50px;
    margin: 0 0 20px;
    color: #af2f2f26;
  `

  const ButtonWrap = styled.div`
    padding: 10px 15px;
    border-bottom: 1px solid #e6e6e6;
  `

  const Button = styled.button`
    padding: 3px 7px;
    color: #777;
    background: none;
    border: none;
    font-size: 16px;
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
