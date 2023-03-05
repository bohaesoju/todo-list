import { TodoProps } from '../App';
import './TodoItem.css';

interface TodoItemProps {
  todo: TodoProps
  onToggleTodo: (id: number) => void
  onUpdateTodo: (id: number, todo: TodoProps) => void
  onDeleteTodo: (id: number) => void
}

function TodoItem({ todo, onToggleTodo, onUpdateTodo, onDeleteTodo }: TodoItemProps) {
  const handleDeleteTodoClick = () => {
    onDeleteTodo(todo.id);
  };

  const handleToggleChange = () => {
    onToggleTodo(todo.id)
  };

  const handleUpdateTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTodo = { ...todo, text: event.target.value };
    onUpdateTodo(todo.id, updatedTodo);
  };

  const getKoreaStandardTime = (timeStamp: number): string => {
    const KoreaStandardTimeOffset = 9 * 60 * 60 * 1000;
    const KoreaStandardTimeStamp = new Date(timeStamp + KoreaStandardTimeOffset);
    const year = KoreaStandardTimeStamp.getFullYear();
    const month = String(KoreaStandardTimeStamp.getMonth() + 1).padStart(2, '0');
    const day = String(KoreaStandardTimeStamp.getDate()).padStart(2, '0');
    const hours = String(KoreaStandardTimeStamp.getHours()).padStart(2, '0');
    const minutes = String(KoreaStandardTimeStamp.getMinutes()).padStart(2, '0');
    const seconds = String(KoreaStandardTimeStamp.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <li className={`TodoItem ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className='CheckBox'
        checked={todo.completed}
        onChange={handleToggleChange}
      />
      <input type="text" className='TodoText' onChange={handleUpdateTodoChange} value={todo.text} />
      <span className='date'>{getKoreaStandardTime(todo.id)}</span>
      <button className='Trash' onClick={handleDeleteTodoClick}></button>
    </li>
  );
}

export default TodoItem;