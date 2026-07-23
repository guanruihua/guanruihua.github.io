import React from 'react'
import './index.less'

import { Button } from 'antd'
import { Flex } from 'aurad'
import { send, send_completions } from './chat'

export default function Server_ai_chat_v2() {
  return (
    <Flex className="server__ai-chat-v2">
      <Button
        onClick={() => {
          send()
        }}
      >
        Send
      </Button>
      <Button
        onClick={() => {
          send_completions()
        }}
      >
        send & completions
      </Button>
    </Flex>
  )
}
