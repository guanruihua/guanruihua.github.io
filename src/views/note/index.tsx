import React from 'react'
import './index.less'
import { useHook } from './hook'
import { Tag } from '@/component'

export function Note() {
  const h = useHook()

  return (
    <div className="container">
      <Tag tree={h.tree} click={h.select} params={h.queryParams} />
      {/* <div>
        <div className="left">
          <Tag tree={h.tree} click={h.select} />
        </div>
        <div className="right">
          <div className="top"></div>
          <div className="center">
            <iframe
              src={h.url}
              frameBorder="0"
              referrerPolicy="no-referrer"
            ></iframe>
          </div>
        </div>
      </div> */}
    </div>
  )
}
