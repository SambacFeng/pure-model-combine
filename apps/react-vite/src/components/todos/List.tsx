import { ListContainer } from '../../adapt-headless'
import { TodoItem } from './TodoItem'

export const List = ListContainer.toWrappedComponent(({ actions, selected }) => {
  const { changeFilter } = actions
  const { todoList, filter } = selected
  // console.log('todoList', todoList)

  return (
    <>
      <ul>
        {todoList.map((todo: { id: number }) => <TodoItem key={todo.id} id={todo.id} />)}
      </ul >
      <div>
        <label><input type="radio" name="show" value="all" onChange={(event) => changeFilter(event.target.value)} checked={filter === 'all'}/>全部</label>
        <label><input type="radio" name="show" value="done" onChange={(event) => changeFilter(event.target.value)} />已完成</label>
        <label><input type="radio" name="show" value="undo" onChange={(event) => changeFilter(event.target.value)} />未完成</label>
      </div>
    </>
  )
})
