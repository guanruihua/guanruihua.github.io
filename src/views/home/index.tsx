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
  const [items, setItems] = React.useState<Conf['items']>([])
  const [guide, setGuide] = React.useState<Conf['guide']>([])
  const init = async () => {
    fetch('/home-items.json')
      .then(async (res) => {
        const data = await res.json()
        setItems(data)
      })
      .catch(console.error)
    fetch('/guide.json')
      .then(async (res) => {
        const data = await res.json()
        setGuide(data)
      })
      .catch(console.error)
  }
  React.useEffect(() => {
    init()
  }, [])

  return (
    <div className="home">
      <div className="layout">
        {items?.map((item, i) => {
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
      <GuideRender guide={guide} />
    </div>
  )
}
