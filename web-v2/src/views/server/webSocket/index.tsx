import React from 'react'
import { User } from './user'
import './index.less'

export default function () {
  return (
    <div className="tool-webSocket">
      <div className="tool-webSocket-box">
        <User name="User1" />
        <User name="User2 " />
      </div>
    </div>
  )
}
