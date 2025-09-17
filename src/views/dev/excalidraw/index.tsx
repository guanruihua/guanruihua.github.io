import React from 'react'
import { Excalidraw } from '@excalidraw/excalidraw'
import './index.less'

export default function () {
  return (
    <div className="dev__excalidraw">
      <div
        className="dev__excalidraw-render"
        style={{ position: 'fixed', height: '100vh', inset: 0 }}
      >
        <Excalidraw />
      </div>
    </div>
  )
}
