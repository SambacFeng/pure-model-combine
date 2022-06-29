import { createCombine } from '@pure-model-combine/core'
import HeaderInitializer from './header'
import TodosInitializer from './todos'

export const globalModels = [TodosInitializer]

export const headerCombine = createCombine({
  todos: TodosInitializer,
  header: HeaderInitializer
}, (props, models, getState) => {
  type State = ReturnType<typeof getState>
  const headerText = (state: State) => state.header
  return {
    selectors: {
      todos: (state) => state.todos,
      headerText
    },
    actions: {
      handleHeaderTextChange: (text: string) => {
        return models.header.actions.setHeaderText(text)
      },
      addTodo: () => {
        const text = headerText(getState()).trim()
        if (text === '') {
          alert('输入不能为空')
          return
        }
        models.todos.actions.addTodo(text)
        models.header.actions.setHeaderText('')
      }
    }
  }
})

export const listCombine = createCombine({
  // 如果只有一个initializer，可不可以不combine，要怎么做
  todos: TodosInitializer
}, () => ({
  selectors: {
    todoList: (state) => state.todos
  },
  actions: {}
}))

// 不加这个会报CE，为什么
type TodoProps = {
  id: number
}
export const todoCombine = createCombine({
  todos: TodosInitializer
}, (props: TodoProps, models, getState) => {
  return {
    selectors: {
      todo: (state) => state.todos.filter(todo => todo.id === props.id)[0]
    },
    actions: {
      handleCheckChange: (id: number) => {
        return models.todos.actions.checkTodo(id)
      },
      handleDelete: (id: number) => {
        return models.todos.actions.deleteTodo(id)
      }
    }
  }
})

export const footerCombine = createCombine({
  todos: TodosInitializer
}, (props: TodoProps, models, getState) => {
  return {
    selectors: {
      todoList: (state) => state.todos
    },
    actions: {
      handleCheckAll: () => {
        return models.todos.actions.checkAll()
      },
      handleClear: () => {
        return models.todos.actions.clearDone()
      }
    }
  }
})
