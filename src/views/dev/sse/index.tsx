import React from 'react'
import { Button, Flex, Input } from 'aurad'
import './index.less'
import { usePageState } from './hook'

export default function SSE() {
  const {
    eventRef,
    state,
    setState,
    handleStartSSE,
    handleClearHistory,
    handleStopSSE,
  } = usePageState()
  return (
    <div className="tool-sse">
      <h4>SSE</h4>
      <div className="tool-sse-box">
        <Flex row className="tool-sse-box-left">
          <div>SSE URL</div>
          <Input
            value={state.url}
            onChange={(e: any) => {
              setState({
                url: e.target.value,
              })
            }}
          />
          <div>Method</div>
          <Flex style={{ width: '100%' }}>
            <Button
              type={state.method === 'post' ? 'primary' : 'default'}
              onClick={() => setState({ method: 'post' })}
            >
              POST
            </Button>
            <Button
              type={state.method === 'get' ? 'primary' : 'default'}
              onClick={() => setState({ method: 'get' })}
            >
              GET
            </Button>
          </Flex>
          <Button onClick={() => handleStartSSE()}> Send SSE </Button>
          <Button disabled={!eventRef.current} onClick={() => handleStopSSE()}>
            Stop SSE
          </Button>
          <Button
            disabled={eventRef.current}
            onClick={() => handleClearHistory()}
          >
            Clear History
          </Button>
        </Flex>
        <div className="tool-sse-box-content">
          {state?.values?.join?.('') || ''}
        </div>
      </div>
    </div>
  )
}
