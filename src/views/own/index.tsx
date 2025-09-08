import React from 'react'
import { useNavigate } from 'react-router'
import { Management } from '@/components'
import { Div, Flex } from 'aurad'
import { Conf } from './conf'
import './index.less'
import { scrollIntoView } from '@/util'

export default function () {
  const nav = useNavigate()

  const onClick = (url: string) => {
    if (url.startsWith('http'))
      window.open(url.indexOf('http') > -1 ? url : `https://${url}`, '_blank')
    if (url.indexOf('/') == 0) nav(url)
    else nav('/' + url)
    // else window.location.hash = '#/' + url // 强制修改 hash
    // else nav(url)
  }
  return (
    <Management
      className="own-page-content"
      menu={[
        {
          title: 'Module',
          name: 'module',
          children: Conf
        }
        
      ]}
      onChange={(name) => scrollIntoView('.module.' + name)}
    >
      <Flex column>
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
    </Management>
  )
}
