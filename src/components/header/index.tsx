import React from 'react'
import './index.less'
import { useNavigate } from 'react-router'
import { Div } from 'aurad'

export interface HeaderProps {
  header?: React.ReactNode
  [key: string]: any
}

export function Header(props: HeaderProps) {
  const { children } = props
  const nav = useNavigate()
  const isHome = ['', '#/', '/'].includes(location.hash)
  
  return (
    <div className="layout-header">
      <Div none={isHome} className="control" onClick={() => nav('/')}>
        Home
      </Div>
      {children}
      <div
        className="control"
        onClick={() => window.open('https://github.com/guanruihua', '__black')}
      >
        Github
      </div>
      <Div className="control" none={isHome} onClick={() => history.back()}>
        Back
      </Div>
    </div>
  )
}
