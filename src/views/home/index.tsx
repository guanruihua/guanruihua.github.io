import React from 'react'
import { useNavigate } from 'react-router'
import './index.less'
import { Conf, Item } from './type'
import { GuideRender } from './guide'

export function Home() {
  const nav = useNavigate()
  const handleClick = (item: Item) => {
    if (item.url) {
      return window.open(item.url, '_blank')
    } else nav(item.name)
  }
  const [state, setState] = React.useState<Conf>({
    items: [],
    guide: [],
  })
  const init = async () => {
    try {
      const res = await fetch('/guide.json')
      const data = await res.json()
      setState(data)
    } catch (error) {
      console.error(error)
    }
  }
  React.useEffect(() => {
    init()
  }, [])

  return (
    <div className="home">
      <div className="layout">
        {state?.items?.map((item, i) => {
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
      <GuideRender guide={state?.guide} />
    </div>
  )
}
