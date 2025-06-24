import React from 'react'
import { Outlet } from 'react-router-dom'
import './index.less'
import './theme.less'

export interface LayoutProps {
  [key: string]: any
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="layout" style={{ overflowX: 'hidden' }}>
      <Outlet />
    </div>
  )
}
