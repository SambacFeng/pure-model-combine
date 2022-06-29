import { adaptReact } from '@pure-model-combine/react'
import { globalModels, headerCombine, listCombine, todoCombine, footerCombine } from 'headless'

const { createReactContainer } = adaptReact(globalModels)

export const HeaderContainer = createReactContainer(headerCombine)
export const ListContainer = createReactContainer(listCombine)
// export const FilterContainer = createReactContainer(filterCombine)
export const TodoContainer = createReactContainer(todoCombine)
export const FooterContainer = createReactContainer(footerCombine)
