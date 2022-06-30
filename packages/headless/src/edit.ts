import { produce, Draft } from 'immer'
import { setupStore } from '@pure-model/core'

export interface EditState {
  isEditing: boolean,
  text: string
}

const initialState: EditState = {
  isEditing: false,
  text: ''
}

export default function EditInitializer () {
  const { store, actions } = setupStore({
    name: 'edit',
    initialState,
    reducers: {
      startEditing: (state: EditState) => produce(state, (state: Draft<EditState>) => {
        state.isEditing = true
      }),
      endEditing: (state: EditState) => produce(state, (state: Draft<EditState>) => {
        state.isEditing = false
      }),
      update: produce((state: Draft<EditState>, text: string) => {
        state.text = text
      })
    }
  })

  return { store, actions }
}
