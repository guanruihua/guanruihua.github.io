import React from 'react'
import { ObjectType } from '0type'

export function useFetchArrayState<T extends ObjectType[] = ObjectType[]>(
  url: string,
): [T, (state: T) => void] {
  const [state, setState] = React.useState<T>([] as unknown as T)

  const init = async () => {
    fetch(url)
      .then(async (res) => {
        const data = await res.json()
        setState(data)
      })
      .catch(console.error)
  }

  React.useEffect(() => {
    init()
  }, [])

  return [state, setState]
}

export function useFetchMDState(
  url: string,
): [string, (state: string) => void] {
  const [state, setState] = React.useState<string>('')

  const init = async () => {
    const cache = localStorage.getItem(url)
    if (cache) {
      setState(cache || '')
    }
    fetch(url)
      .then(async (res) => {
        const data = await res.text()
        localStorage.setItem(url, data || '')
        setState(data)
      })
      .catch(console.error)
  }

  React.useEffect(() => {
    init()
  }, [])

  return [state, setState]
}
