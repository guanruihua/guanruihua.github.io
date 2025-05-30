import React from 'react'
import './index.less'
import { Div, DivProps } from 'aurad'

export interface CardProps extends DivProps {
  label: string
  style?: React.CSSProperties
  [key: string]: any
}

export function Card(props: CardProps) {
  const { label, name, style, ...rest } = props
  return (
    <Div className="card" style={style} {...rest}>
      <div className="logo">{label.slice(0, 1)}</div>
      <div className="name">{label}</div>
    </Div>
  )
}
