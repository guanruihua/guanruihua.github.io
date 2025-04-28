import { useSetState } from '0hook'
import React from 'react'
import './index.less'
import { message } from '../msg'

export function Test() {
  const [state, setState] = useSetState(
    {
      status: true,
    },
    'test-cache',
  )
  // React.useEffect(() => {
  //   message.success('content 1')
  //   message.success('content 2')
  //   message.success('content 3')
  // }, [])
  return (
    <div className="tool-test">
      <button
        onClick={() => {
          message.success('content ' + new Date().getTime())
        }}
      >
        open
      </button>
      <div className="test-card">
        <div className="test-card-layout">
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
        </div>
      </div>
    </div>
  )
}
