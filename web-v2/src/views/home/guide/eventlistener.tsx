import { isBoolean } from 'asura-eye'
import React from 'react'


/**
 * @title useEventListener<T = any>
 * @param {keyof WindowEventMap} type 
 * @param {(e:Event)=> T | undefined} listener 监听回调方法, 通过返回值对state赋值
 * @param {T} [defaultValue] 
 * @param {boolean | AddEventListenerOptions} [options]
 * @returns {[T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>]}
 */

export function useEventListener<T = any>(
  type: keyof WindowEventMap,
  listener: (e: Event) => T | undefined,
  defaultValue?: T,
  options?: boolean | AddEventListenerOptions,
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {

  const ref = React.useRef<T | undefined>(defaultValue)
  const [state, _setState] = React.useState<T | undefined>(defaultValue)

  const onListener = (e?: any) => {
    e?.preventDefault()
    ref.current = listener(e)
    _setState(ref.current)
  }

  React.useEffect(() => {
    window.removeEventListener(type, onListener)
    window.addEventListener(
      type,
      onListener,
      isBoolean(options) ? options : { passive: true, ...options },
    )
    onListener()
    return () => {
      window.removeEventListener(type, onListener)
    }
  }, [])

  return [state, _setState] as const
}
