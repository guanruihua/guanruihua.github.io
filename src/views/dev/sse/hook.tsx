import React from 'react'
import { useSetState } from '0hook'
import { isArray } from 'asura-eye'

interface PageState {
  method: string
  url: string
  values: any[]
}

export const usePageState = () => {
  const [state, setState] = useSetState<PageState>({
    method: 'post',
    url: 'http://localhost:2400/sse',
    values: [],
  }, '/tool/sse|cache')
  const stateRef = React.useRef(state)

  React.useEffect(() => {
    stateRef.current = state
  }, [state])

  const eventRef = React.useRef<any>(undefined)
  const handleClearHistory = () => {
    setState({
      values: [],
    })
  }
  const handleStopSSE = () => {
    if (eventRef.current?.close) {
      eventRef.current.close()
      eventRef.current = undefined
      setState(state)
    }
  }
  const handleStartSSE = async () => {
    if (!state.url) return

    if (state.method === 'post') {
      const response = await fetch(state.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/event-stream',
        },
      })

      if (!response.body) {
        throw new Error('ReadableStream not supported')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      if (!isArray(state.values)) {
        state.values = []
      }
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        let buffer = decoder.decode(value, { stream: true })

        const val = buffer.split('\n')?.pop?.()
        if (val) {
          state.values.push(val)
          setState(state)
        }
      }

      return
    }
    const eventSource = new EventSource(state.url)
    eventRef.current = eventSource
    eventSource.addEventListener('customEvent', (event: any) => {
      const { type, content } = JSON.parse(event.data)
      if (type === 'stop') {
        eventSource.close()
        eventRef.current = undefined
        setState(state)
        return
      }
      if (!isArray(state.values)) {
        state.values = []
      }
      state.values.push(content)
      setState(state)
    })

    // 监听服务端终止
    eventSource.onerror = function (event) {
      eventSource.close()
      eventRef.current = undefined
      setState(state)
    }
  }

  return {
    eventRef,
    state,
    setState,
    handleStartSSE,
    handleClearHistory,
    handleStopSSE,
  }
}
