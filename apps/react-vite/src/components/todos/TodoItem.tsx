import { TodoContainer } from '../../adapt-headless'

export const TodoItem = TodoContainer.toWrappedComponent(({ actions, selected }) => {
  const { handleCheckChange, handleDelete } = actions
  const { id, text, done } = selected.todo
  console.log('todo', id, text, done)

  return (
    <li>
      <input
        type="checkbox"
        checked={done}
        onChange={() => handleCheckChange(id)}
      />
      <span>
        {text}
      </span>
      <button onClick={() => handleDelete(id)}>删除</button>
    </li>
  )
})
