import { useSetState } from '0hook'
import { ObjectType } from '0type'

export interface Item extends ObjectType {
  id: string
  type: string
}

export interface State {
  selectId: string
  list: Item[]
}

export const usePageState = () => {
  const [state, setState] = useSetState<State>({
    selectId: '',
    list: [{ id: '1', type: 'sider' }],
  })

  const updateState = (type: string, value: any) => {}

  const find = (id: string) => state.list?.find((item) => item.id === id)
  const inSider = (id: string) => find(id)?.type === 'sider'
  const inContent = (id: string) => find(id)?.type === 'content'
  const getId = () => ((state.list?.length || 0) + 1).toString()

  const to = (id: string, type: string) => {
    if (state.list) {
      state.list = state.list.map((item) => {
        if (item.id === id) {
          item.type = type
        }
        return item
      })
    }
  }

  const del = (id: string) => {
    if (state.list) {
      state.list = state.list.map((item) => {
        if (item.id === id) {
          item.type = 'del'
        }
        return item
      })
    }
  }
  const create = () => {
    const newItem = { id: getId(), type: 'sider' }

    if (state.list) {
      state.list.push(newItem)
    } else {
      state.list = [newItem]
    }
  }

  return {
    state,
    setState,
    updateState,
    find,
    inSider,
    inContent,
    getId,
    to,
    create,
    del,
  }
}
