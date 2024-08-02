import React from 'react'
import { useNavigate } from 'react-router'
import './index.less'

export function Home() {
  const nav = useNavigate()
  const list: any[] = [
    {
      name: 'note',
      label: 'Note'
    },
    {
      name: 'pkg',
      label: 'Package'
    }
  ]
  const handleClick = (item: any) => {
    nav(item.name)
  }
  return (
    <div className="home">
      <div className="layout">
        {list.map((item, i) => {
          return (
            <div className="card" key={i} onClick={() => handleClick(item)}>
              <div className="logo">{item.label.slice(0, 1)}</div>
              <div className="name">{item.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
