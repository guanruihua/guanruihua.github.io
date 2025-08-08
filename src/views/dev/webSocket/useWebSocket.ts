import { useSetState } from '0hook'
import { parse } from 'abandonjs'
import { useEffect, useRef, useState } from 'react'

export function useWebSocket(url: string, cacheName: string) {
  const [isReady, setIsReady] = useState(false)
  const [state, setState] = useSetState(
    {
      messages: [],
    },
    cacheName,
  )

  const { messages = [] } = state

  const wsRef = useRef<any>(null)

  const handle = {
    messages,
    async onMessage(event: any) {
      const val: any = parse(await event.data?.text?.(), undefined)
      console.log(val, this.messages)
      if (val && val.id) {
        const newMessages = this?.messages || []
        const ids: string[] = newMessages.map((_: any) => _.id)

        if (ids.includes(val.id)) {
          return
        }
        newMessages.push(val)

        setState({
          messages: newMessages,
        })
        this.messages = newMessages
      }
    },
  }

  useEffect(() => {
    const socket = new WebSocket(url)
    // msgRef.current = messages
    socket.onopen = () => {
      setIsReady(true)
      console.log('WebSocket connected')
    }

    socket.onclose = () => {
      setIsReady(false)
      console.log('WebSocket disconnected')
    }

    socket.onmessage = handle.onMessage
    socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    wsRef.current = socket

    return () => {
      socket.close()
    }
  }, [url])

  const sendMessage = (message: any) => {
    if (wsRef.current && isReady) {
      wsRef.current.send(message)
      return true
    }
    return false
  }

  return { isReady, messages, sendMessage }
}
