import React from 'react'
import './index.less'
import './index.css'
import './theme.less'
import { Outlet } from 'react-router-dom'

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
