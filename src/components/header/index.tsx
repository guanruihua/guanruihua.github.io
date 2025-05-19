import React from 'react'
import './index.less'
import { useNavigate } from 'react-router'

export interface HeaderProps {
  header?: React.ReactNode
  [key: string]: any
}

export function Header(props: HeaderProps) {
  const { children } = props
  const nav = useNavigate()

  return (
    <div className="layout-header">
      <div className="control" onClick={() => nav('/')}>
        Home
      </div>
      {children}
      <div
        className="control"
        onClick={() => window.open('https://github.com/guanruihua', '__black')}
      >
        Github
      </div>
      <div className="control" onClick={() => history.back()}>
        Back
      </div>
    </div>
  )
}
