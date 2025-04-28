import React from 'react'
import { Outlet } from 'react-router-dom'
import './index.less'
import './theme.less'

export interface LayoutProps {
  [key: string]: any
}

export function Layout(props: LayoutProps) {
  return (
    <div className="layout">
      <Outlet />
    </div>
  )
}
