import { TodoProps } from '../App';
import styled from 'styled-components'

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
    <TodoItemList completed={todo.completed}>
      <CheckBox
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleChange}
      />
      <TodoText type="text" onChange={handleUpdateTodoChange} value={todo.text} />
      <TodoDate>{getKoreaStandardTime(todo.id)}</TodoDate>
      <DeleteButton className='Trash' onClick={handleDeleteTodoClick}></DeleteButton>
    </TodoItemList>
  );
}

const TodoItemList = styled.li<{ completed: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    border-bottom: 1px solid #ededed;
    text-decoration: ${(props) => (props.completed ? "line-through" : "")};
  `

  const CheckBox = styled.input`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid rgb(206, 212, 218);
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
    margin-right: 10px;
    &:focus {
      outline: max(2px, 0.15em) solid currentColor;
      outline-offset: max(2px, 0.15em);
    }
    &:before {
      content: "";
      width: 0.65em;
      height: 0.65em;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      transform: scale(0);
      transform-origin: bottom left;
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em var(--form-control-color);
      background-color: CanvasText;
    }
    &:checked {
      &:before {
        transform: scale(1);
      }  
    }
  `

  const TodoText = styled.input`
    border: none;
    background: transparent;
    padding: 10px 0;
    font-size: 16px;
  `

  const TodoDate = styled.span`
    font-size: 14px;
    letter-spacing: -1px;
    padding-right: 5px;
  `

  const DeleteButton = styled.button`
    padding: 0;
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 10px;
    height: 12px;
    border: 2px solid transparent;
    box-shadow:
        0 0 0 2px,
        inset -2px 0 0,
        inset 2px 0 0;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    margin-top: 4px;
    cursor: pointer;
    &:after, &:before {
      content: "";
      display: block;
      box-sizing: border-box;
      position: absolute
    }
    &:after {
      background: currentColor;
      border-radius: 3px;
      width: 16px;
      height: 2px;
      top: -4px;
      left: -5px
    }
    &:before {
      width: 10px;
      height: 4px;
      border: 2px solid;
      border-bottom: transparent;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      top: -7px;
      left: -2px
    }
    &:hover {
      background-color: #ff6347;
    }
  `

export default TodoItem;