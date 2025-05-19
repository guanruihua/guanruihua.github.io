import React from 'react'
import { Header } from '../header'
import './index.less'

export interface ContainerProps {
  header?: React.ReactNode
  [key: string]: any
}

export function Container(props: ContainerProps) {
  const { children, header } = props
  return (
    <div className="layout-container">
      <Header>{header}</Header>
      <div className="layout-box">{children}</div>
    </div>
  )
}
