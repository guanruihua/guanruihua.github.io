import React from 'react'
import { Node } from './type'

export const DiagramHandle = ({ id, type }: { id:string, type: Node['type'] }) => {
  const conf = {
    className: 'd-node-handle',
    "data-id": id,
  }
  if (['deepseek', 'database', 'RSS'].includes(type))
    return <div {...conf} data-location="top" data-shape="rotate-square" />
  if (type === 'workflow-start') return <div {...conf} data-location="right" />

  if (type === 'agent') {
    return (
      <React.Fragment>
        <div {...conf} data-location="right" />
        <div
          {...conf}
          data-location="bottom"
          data-type="chat-model"
          data-shape="rotate-square"
        ></div>
        <div
          {...conf}
          data-location="bottom"
          data-type="chat-model-label"
          data-flag="label"
        >
          Chat Model<span className="label-required">*</span>
        </div>
        <div
          {...conf}
          data-location="bottom"
          data-type="memory"
          data-shape="rotate-square"
        />
        <div
          {...conf}
          data-location="bottom"
          data-type="memory-label"
          data-flag="label"
        >
          Memory
        </div>
        <div
          {...conf}
          data-location="bottom"
          data-type="tool"
          data-shape="rotate-square"
        />
        <div
          {...conf}
          data-location="bottom"
          data-type="tool-label"
          data-flag="label"
        >
          Tool
        </div>
        <div {...conf} data-location="left" data-shape="square" />
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <div {...conf} data-location="top" />
      <div {...conf} data-location="right" />
      <div {...conf} data-location="bottom" />
      <div {...conf} data-location="left" />
    </React.Fragment>
  )
}
