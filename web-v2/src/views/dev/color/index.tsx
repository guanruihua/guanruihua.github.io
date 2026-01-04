import React from 'react'
import './index.less'
import { classNames, copyText } from 'harpe'
import { conf } from './conf'
import { message } from '../msg'

export default function Color() {
  return (
    <div className="tool-color">
      <div className="tool-color-layout">
        {conf.map(([name, value, addClassName], i) => {
          return (
            <div
              className={classNames("item", addClassName)}
              key={i}
              onClick={() => {
                if (copyText(value)) {
                  message.success('Copy Success ')
                } else {
                  message.success('Copy Fail ')
                }
              }}
            >
              <div
                className="value"
                style={{ background: value, boxShadow: `0 0 4px ${value}` }}
              />
              <div className="name">{name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
