import { produce, Draft } from 'immer'
import { setupStore } from '@pure-model/core'

export interface Todo {
  id: number,
  text: string,
  done: boolean,
}

export type Todos = Todo[]

const initialState: Todos = []

export default function TodosInitializer () {
  const { store, actions } = setupStore({
    name: 'todos',
    initialState,
    reducers: {
      addTodo: produce((draft: Draft<Todos>, text: string) => {
        draft.push({
          id: Date.now(),
          text,
          done: false
        })
      }),
      deleteTodo: produce((draft: Draft<Todos>, id: number) => {
        return draft.filter(todo => todo.id !== id)
      }),
      checkTodo: produce((draft: Draft<Todos>, id: number) => {
        draft.map(todo => {
          if (todo.id === id) {
            todo.done = !todo.done
          }
          return todo
        })
      }),
      clearDone: (state: Todos) => produce(state, (draft: Draft<Todos>) => {
        return draft.filter(todo => !todo.done)
      }),
      checkAll: (state: Todos) => produce(state, (draft: Draft<Todos>) => {
        return draft.map(todo => {
          todo.done = true
          return todo
        })
      }),
      updateTodo: produce((draft: Draft<Todos>, { id, text }: { id: number, text: string }) => {
        draft.map(todo => {
          if (todo.id !== id) return todo
          todo.text = text
          return todo
        })
      })
    }
  })

  return { store, actions }
}
