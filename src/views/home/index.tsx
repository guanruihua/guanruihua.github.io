import React from 'react'
import { useNavigate } from 'react-router'
import './index.less'
import { Conf, Item } from './type'
import { GuideRender } from './guide'
import { Container } from '@/components'
import { useSetState } from '0hook'
import { classNames } from 'harpe'

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

  const [state, setState] = useSetState(
    {
      PE: true,
    },
    'cache-guide-state',
  )

  return (
    <Container
      header={
        <div
          className={classNames('control PE', {
            disabled: !state.PE,
          })}
          onClick={() =>
            setState({
              PE: !state.PE,
            })
          }
        >
          PE
        </div>
      }
    >
      <div className="home">
        <div className="layout">
          {items
            .filter((_) => (_.PE === true ? state.PE : true))
            ?.map((item, i) => {
              return (
                <div
                  className="card"
                  key={item.name}
                  style={item.style}
                  onClick={() => handleClick(item)}
                >
                  <div className="logo">{item.label.slice(0, 1)}</div>
                  <div className="name">{item.label}</div>
                </div>
              )
            })}
        </div>
        <GuideRender
          guide={guide.filter((_) => (_.PE === true ? state.PE : true))}
        />
      </div>
    </Container>
  )
}
