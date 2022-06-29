import { HeaderContainer } from '../../adapt-headless'

export const Header = HeaderContainer.toWrappedComponent(({ actions, selected }) => {
  const { addTodo, handleHeaderTextChange } = actions
  const { headerText } = selected

  return (
    <div>
      <h1>TODOS</h1>
      <input
        type="text"
        placeholder='输入待办内容，按回车确认'
        value={headerText}
        onChange={event => handleHeaderTextChange(event.target.value)}
        onKeyUp={({ key }) => {
          if (key === 'Enter') {
            addTodo()
          }
        }}
      />
    </div >
  )
})
