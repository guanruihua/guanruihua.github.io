import React from 'react'
import { useNavigate } from 'react-router'
import './index.less'
import { Conf, Item } from './type'
import { Container, Guide } from '@/components'
import { useSetState } from '0hook'
import { classNames } from 'harpe'
import { useFetchArrayState } from '@/hook'

export function Home() {
  const nav = useNavigate()
  const handleClick = (item: Item) => {
    if (item.url) {
      return window.open(item.url, '_blank')
    } else nav(item.name)
  }
  const [items] = useFetchArrayState<Conf['items']>('/home-items.json')
  const [guide] = useFetchArrayState<Conf['guide']>('/guide.json')

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
        <Guide guide={guide.filter((_) => (_.PE === true ? state.PE : true))} />
      </div>
    </Container>
  )
}
