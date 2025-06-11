import { Div } from 'aurad'
import React from 'react'
import { useNavigate } from 'react-router'

export interface GuideProps {
  guide: {
    name?: string
    type?: string
    next: string[][]
  }[]
  state?: {
    selects?: string[]
    [key: string]: any
  }
  [key: string]: any
}

const GuideRowItem = ({ name, url }: { name: string; url: string }) => {
  const nav = useNavigate()

  return (
    <div
      className="guide-item"
      onClick={() => {
        if (url.indexOf('.') > -1)
          window.open(
            url.indexOf('http') > -1 ? url : `https://${url}`,
            '_blank',
          )
        else nav(url)
      }}
    >
      {name}
    </div>
  )
}

export function Guide(props: GuideProps) {
  const { guide, state } = props
  const { selects = [] } = state || {}
  // console.log(selects)
  return (
    <div className="guide">
      {guide?.map((item: GuideProps['guide']['0'], i: number) => {
        const { name, next, type = 'Own' } = item
        const none = !!(type && selects.length > 0 && !selects.includes(type))
        return (
          <Div
            none={none}
            className="guide-module"
            key={i}
          >
            {name && <div className="title">{name}</div>}
            {next?.map((child, j) => {
              const [name, url] = child
              return <GuideRowItem key={j} name={name} url={url} />
            })}
          </Div>
        )
      })}
    </div>
  )
}
