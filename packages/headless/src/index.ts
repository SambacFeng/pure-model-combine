import { createCombine, subscribeModels } from '@pure-model-combine/core'
import HeaderInitializer from './header'
import TodosInitializer from './todos'
import EditInitializer from './edit'
import FilterInitializer from './filter'

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
  todos: TodosInitializer,
  filter: FilterInitializer
}, (props, models, getState) => {
  subscribeModels(models, state => {
    // 修改state一次，sub执行两次，为什么
    localStorage.setItem('pure-model-combine-todo', JSON.stringify(state.todos))
  })
  return {
    selectors: {
      todoList: (state) => {
        if (state.filter === 'done') {
          return state.todos.filter((todo: { done: boolean }) => todo.done)
        } else if (state.filter === 'undo') {
          return state.todos.filter((todo: { done: boolean }) => !todo.done)
        } else {
          return state.todos
        }
      },
      filter: (state) => {
        return state.filter
      }
    },
    actions: {
      changeFilter: (filter: string) => {
        return models.filter.actions.setFilterType(filter)
      }
    }
  }
})

type TodoProps = {
  id: number
}
export const todoCombine = createCombine({
  todos: TodosInitializer,
  edit: EditInitializer
}, (props: TodoProps, models, getState) => {
  type State = ReturnType<typeof getState>
  const todo = ({ todos }: State) => todos.filter((todo: { id: number }) => todo.id === props.id)[0]
  const isEditing = (state: State) => state.edit.isEditing
  return {
    selectors: {
      todo,
      isEditing,
      newText: (state) => isEditing(state) ? state.edit.text : todo(state).text || ''
    },
    actions: {
      handleCheckChange: (id: number) => {
        return models.todos.actions.checkTodo(id)
      },
      handleDelete: (id: number) => {
        return models.todos.actions.deleteTodo(id)
      },
      handleEditing: () => {
        // console.log('handleEditing')
        models.edit.actions.startEditing()
        models.edit.actions.update(todo(getState())?.text || '')
      },
      finishEditing: () => {
        const newText = models.edit.store.getState().text
        // console.log('finishEditing newtext', newText)
        if (newText.trim().length) {
          models.todos.actions.updateTodo({ id: props.id, text: newText })
        } else {
          models.todos.actions.deleteTodo(props.id)
        }
        models.edit.actions.endEditing()
      },
      updateText: (text: string) => {
        models.edit.actions.update(text)
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
        // console.log('handlecheckall')
        return models.todos.actions.checkAll()
      },
      handleClear: () => {
        return models.todos.actions.clearDone()
      }
    }
  }
})
