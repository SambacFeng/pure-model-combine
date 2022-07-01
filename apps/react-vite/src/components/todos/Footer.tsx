import { FooterContainer } from '../../adapt-headless'

export const Footer = FooterContainer.toWrappedComponent(({ actions, selected }) => {
  const { handleCheckAll, handleClear } = actions
  const { todoList } = selected

  return (
    <div>
      <span>{todoList.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)} / {todoList.length} 已完成 </span>
      <button onClick={() => handleCheckAll()}>全选</button>
      <button onClick={() => handleClear()}>删除全部已完成</button>
    </div>
  )
})
