import { TodoContainer } from '../../adapt-headless'

export const TodoItem = TodoContainer.toWrappedComponent(({ actions, selected }) => {
  const { handleCheckChange, handleDelete, handleEditing, finishEditing, updateText } = actions
  const { todo, isEditing, newText } = selected
  const { id, text, done } = todo
  // console.log('todo', id, text, done)

  return (
    <li>
      <input
        type="checkbox"
        checked={done}
        onChange={() => handleCheckChange(id)}
      />
      {
        isEditing
          ? <span>
            <input
              type="text"
              value={newText}
              onChange={(event) => updateText(event.target.value)}
              onBlur={() => finishEditing()}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  finishEditing()
                }
              }}
              autoFocus
            />
            <button onClick={() => finishEditing()}>完成</button>
          </span>
          : <span>
            {text}
            <button onClick={() => handleEditing()}>编辑</button>
            <button onClick={() => handleDelete(id)}>删除</button>
          </span>
      }
    </li>
  )
})
