import React from 'react'
import { useNavigate } from 'react-router'
import { Div, Flex } from 'aurad'
import { Conf } from './conf'
import './index.less'

export default function () {
  const nav = useNavigate()

  const onClick = (url: string) => {
    if (url.startsWith('http'))
      window.open(url.indexOf('http') > -1 ? url : `https://${url}`, '_blank')
    if (url.indexOf('/') == 0) nav('/own' + url)
    else nav('/own/' + url)
    // else window.location.hash = '#/' + url // 强制修改 hash
    // else nav(url)
  }
  return (
    <Flex column className="own-page-content">
      {Conf.map((item, i) => {
        const { title, name, group = [] } = item
        return (
          <div key={i} className={'module ' + name}>
            <div className="title">{title}</div>
            <Div className="children" none={group.length < 1}>
              {group.map((child, j) => {
                const [title, url] = child

                return (
                  <Div key={j} className="name" onClick={() => onClick(url)}>
                    {title}
                  </Div>
                )
              })}
            </Div>
          </div>
        )
      })}
    </Flex>
  )
}
