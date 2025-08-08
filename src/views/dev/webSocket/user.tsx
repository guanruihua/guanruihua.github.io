import { useSetState } from '0hook'
import { toString } from 'abandonjs'
import { Button, Input } from 'aurad'
import React from 'react'
import { useWebSocket } from './useWebSocket'

export interface UserProps {
  [key: string]: any
}

export function User(props: UserProps) {
  const { name } = props
  const [own, setOwn] = useSetState({
    value: '',
  })
  const url = 'ws://localhost:2410'

  const { sendMessage, messages = [] } = useWebSocket(
    url,
    '/tool/webSocket/cache|' + name,
  )

  // console.log({ messages })

  const handleSend = () => {
    const record = {
      id: Date.now(),
      type: 'message',
      name,
      content: own.value || '',
    }
    sendMessage(toString(record))
  }
  return (
    <div className="webSocket-user">
      <h3>
        <span>{name}</span>
      </h3>
      <div className="webSocket-user-message-box">
        {messages?.map((item: any, i) => {
          const { type, name, content } = item
          return (
            <div key={i}>
              {name}-{content}
            </div>
          )
        })}
      </div>
      <div className="webSocket-user-content">
        <Input
          value={own.value}
          onChange={(e: any) => {
            const val = e.target.value
            setOwn({
              value: val,
            })
          }}
        />
        <Button onClick={() => handleSend()}>Send</Button>
      </div>
    </div>
  )
}
