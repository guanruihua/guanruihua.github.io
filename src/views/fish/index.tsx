import React from 'react'
import { useNavigate } from 'react-router'
import './index.less'
import { Conf, Item } from './type'
import { Container, Guide } from '@/components'
import { useSetState } from '0hook'
import { classNames } from 'harpe'
import { useFetchArrayState } from '@/hook'

export function Fish() {
  const nav = useNavigate()
  const handleClick = (item: Item) => {
    if (item.url) {
      return window.open(item.url, '_blank')
    } else nav(item.name)
  }
  const [guide] = useFetchArrayState<Conf['guide']>('/fish-guide.json')

  return (
    <Container>
      <div className="home">
        <div className="layout"></div>
        <Guide guide={guide} />
      </div>
    </Container>
  )
}
