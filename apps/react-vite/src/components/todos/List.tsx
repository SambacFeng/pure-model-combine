import { Key } from 'react'
import { ListContainer } from '../../adapt-headless'
import { TodoItem } from './TodoItem'

export const List = ListContainer.toWrappedComponent(({ actions, selected }) => {
  const { todoList } = selected
  // console.log('todoList', todoList)

  return (
    <ul>
      {todoList.map((todo: { id: number }) => <TodoItem key={todo.id} id={todo.id} />)}
    </ul >
  )
})
