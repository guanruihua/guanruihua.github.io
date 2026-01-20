import { Node, PageState } from '../../component'
import { getRect } from './utils'

export const reload = async (state: PageState, rootDom: HTMLDivElement) => {
  const newState: PageState = {
    rootRect: rootDom.getBoundingClientRect(),
    Size: {},
  }
  state?.nodes?.forEach((node) => {
    const { id } = node
    const rect = getRect(`.d-node[data-id="${id}"]`)
    newState.Size[id] = [rect.width, rect.height]
  })

  console.log('🚀 ~ reload ~ newState:', newState)
  // console.log(state)
  return newState
}
