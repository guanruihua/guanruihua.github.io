import React from 'react'
import { useNavigate } from 'react-router'
import { Container } from '@/components'
import { Div } from 'aurad'
import { Conf } from './conf'
import './index.less'

export default function () {
  const nav = useNavigate()
  
  const onClick = (url: string) => {
    if (url.indexOf('http') > -1)
      window.open(url.indexOf('http') > -1 ? url : `https://${url}`, '_blank')
    if (url.indexOf('/') == 0) nav(url)
    else nav('/' + url)
  }
  return (
    <Container>
      <div className="own">
        {Conf.map((item, i) => {
          const { title, children = [] } = item
          return (
            <div key={i} className="module">
              <div className="title">{title}</div>
              <Div className="children" none={children.length < 1}>
                {children.map((child, j) => {
                  const [name, url] = child

                  return (
                    <div key={j} className="name" onClick={() => onClick(url)}>
                      {name}
                    </div>
                  )
                })}
              </Div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}
