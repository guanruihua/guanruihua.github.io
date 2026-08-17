import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import Default_JSON from './conf/default/json.ts'

export type State = Partial<{
  from_lang: string
  from_editor_key: string
  from_value: string
  from_enabled: boolean

  to_lang: string
  to_editor_key: string
  to_value: string
  to_enabled: boolean
  EventBus: Partial<{
    // Format(): void
    [key: string]: (...params: any[]) => void | Promise<void>
  }>
  [key: string]: any
}>

type Actions<T> = {
  set(newState: Partial<T>): void
  get(): T
  setEventBus(
    key: string,
    handle: (...params: any[]) => void | Promise<void>,
  ): void
}

export type UseWebViewState = State &
  Actions<State>

export const useTransformFactoryStore = create(
  persist<UseWebViewState>(
    (set, get) => ({
      from_lang: 'json',
      from_editor_key: '__from',
      from_value: Default_JSON,
      from_enabled: true,
      to_enabled: false,
      to_lang: 'text',
      to_editor_key: '__to',
      to_value: '',
      EventBus: {},
      set,
      get,
      setEventBus(
        key: string,
        handle: (...params: any[]) => void | Promise<void>,
      ) {
        const { EventBus = {} } = get()
        EventBus[key] = handle
        set({ EventBus })
      },
    }),
    {
      name: 'TransformFactory/store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
