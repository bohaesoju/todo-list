import './TodoItem.css';

function TodoItem({ todo, deleteTodo, toggleTodo, updateTodo }) {
  const handleDeleteClick = () => {
    deleteTodo(todo.id);
  };

  const handleCheckboxChange = () => {
    toggleTodo(todo.id)
  };

  const handleTodoTextChange = (event) => {
    const updatedTodo = { ...todo, text: event.target.value };
    updateTodo(todo.id, updatedTodo);
  };

  const getKoreaStandardTime = (timeStamp): any => {
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
      <label>
        <input
          type="checkbox"
          className='CheckBox'
          checked={todo.completed}
          onChange={handleCheckboxChange}
        />
      </label>
      <input type="text" className='TodoText' onChange={handleTodoTextChange} value={todo.text} />
      <span className='date'>{getKoreaStandardTime(todo.id)}</span>
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default TodoItem;