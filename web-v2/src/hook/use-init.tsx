import React from 'react'
import { isFunction, isPromise } from 'asura-eye'

type Func =
  | (() => void | Promise<void> | (() => void) | Promise<() => void>)
  | null
  | undefined

export const useInit = (load: Func, watcher: any = []) => {
  React.useEffect(() => {
    const unLoad = load?.()

    return () => {
      if(!unLoad) return
      if (isPromise(unLoad)) {
        unLoad.then((fn: any) => fn?.())
      } else if (isFunction(unLoad)) {
        ;(unLoad as () => void)?.()
      }
    }
  }, watcher)
}
