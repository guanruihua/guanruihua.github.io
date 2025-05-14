import { useSetState } from '0hook'
import React from 'react'
import './index.less'
import { message } from '../msg'
import { Cmp } from './cmp'
import { SvgDemo } from './svg'


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
      <SvgDemo />

      {/* <!-- 三次贝塞尔曲线 --> */}
      {/* <svg width="400" height="300" viewBox="0 0 400 300">
        <path
          d="M100,50 C150,50 200,50 250,50 C250,100 250,150 250,200 C200,200 150,200 100,200 C100,150 100,100 100,50 Z"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      </svg> */}
      {/* <!-- 二次贝塞尔曲线 --> */}
      {/* <Cmp /> */}
      {/* <button
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
      </div> */}
    </div>
  )
}
