import React from 'react'
import { useNavigate } from 'react-router'
import './index.less'

const list: any[] = [
  [
    'sandbox',
    'Sandbox',
    {
      background:
        'radial-gradient(ellipse at right top, #6e9bc5 0%, #151419 47%, #151419 100%)',
    },
  ],
  [
    'demo',
    'Own Demo',
    {
      background:
        'radial-gradient(ellipse at right top, #a6559d 0%, #151419 47%, #151419 100%)',
    },
    'https://ruihuag-demo.github.io/'
  ],
  [
    'pkg',
    'Package',
    {
      background:
        'radial-gradient(ellipse at right top, #107667ed 0%, #151419 47%, #151419 100%)',
    },
  ],
  [
    'static',
    'Static',
    {
      background:
        'radial-gradient(ellipse at right top, #c67915 0%, #151419 47%, #151419 100%)',
    },
    "https://0static.github.io/"
  ],
]

export function DevHomePage() {
  const nav = useNavigate()
  const handleClick = (name: string, url?: string) => {
    if (url) {
      return window.open(url, '_blank')
    } else nav(name)
  }
  return (
    <div className="dev-page">
      <div className="dev-page-modules">
        {list.map(([name, label, style, url]) => {
          return (
            <div
              className="dev-page-modules-card"
              key={name}
              style={style as any}
              onClick={() => handleClick(name, url)}
            >
              <div className="logo">{label.slice(0, 1)}</div>
              <div className="name">{label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
