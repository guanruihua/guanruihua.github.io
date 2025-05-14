import React from 'react'
import { useNavigate } from 'react-router'
import './index.less'
import { Item } from './type'
import { conf } from './conf'
import { GuideRender } from './guide'

export function Home() {
  const nav = useNavigate()
  const handleClick = (item: Item) => {
    if (item.url) {
      return window.open(item.url, '_blank')
    } else nav(item.name)
  }

  return (
    <div className="home">
      <div className="layout">
        {conf.items.map((item, i) => {
          return (
            <div
              className="card"
              key={i}
              style={item.style}
              onClick={() => handleClick(item)}
            >
              <div className="logo">{item.label.slice(0, 1)}</div>
              <div className="name">{item.label}</div>
            </div>
          )
        })}
      </div>
      <GuideRender guide={conf.guide} />
    </div>
  )
}
