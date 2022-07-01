import { setupStore } from '@pure-model/core'

const initialState = 'all'

export default function FilterInitializer () {
  return setupStore({
    name: 'filter',
    initialState,
    reducers: {
      setFilterType: (_: any, filter: string) => filter
    }
  })
}
