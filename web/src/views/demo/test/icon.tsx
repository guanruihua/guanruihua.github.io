import React from 'react'
import type { IconProps } from './type'

export function Icon({ icon, color = '', size = '' }: IconProps) {
  const _color = color ? ` icon--${color}` : ''
  const _size = size ? ` icon--${size}` : ''

  return (
    <svg
      className={`icon${_color}${_size}`}
      width="16px"
      height="16px"
      aria-hidden="true"
    >
      <use href={`#${icon}`} />
    </svg>
  )
}
export function IconSprites() {
  const viewBox = '0 0 16 16'

  return (
    <svg width="0" height="0" display="none">
      <symbol id="up" viewBox={viewBox}>
        <g
          fill="none"
          stroke="currentcolor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        >
          <polyline points="2 8,8 2,14 8" />
          <polyline points="8 2,8 14" />
        </g>
      </symbol>
      <symbol id="down" viewBox={viewBox}>
        <g
          fill="none"
          stroke="currentcolor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        >
          <polyline points="8 2,8 14" />
          <polyline points="2 8,8 14,14 8" />
        </g>
      </symbol>
      <symbol id="warning" viewBox={viewBox}>
        <g
          fill="none"
          stroke="currentcolor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        >
          <polygon points="8 1,15 14,1 14" />
          <polyline points="8 6,8 10" />
          <polyline points="8 12,8 12" />
        </g>
      </symbol>
    </svg>
  )
}
