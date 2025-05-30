import React from 'react'
import { useNavigate } from 'react-router'
import './index.less'
import { Conf, Item } from './type'
import { Card, Container, Guide } from '@/components'
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
      PE: false,
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
          {items?.map((item, i) => {
            const { PE = false, ...rest } = item
            return (
              <Card
                none={PE && !state.PE}
                key={i}
                {...rest}
                onClick={() => handleClick(item)}
              />
            )
          })}
        </div>
        <Guide guide={guide.filter((_) => (_.PE === true ? state.PE : true))} />
      </div>
    </Container>
  )
}
