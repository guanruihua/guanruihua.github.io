import React from 'react'
import './index.less'

export interface GuideProps {
  name?: string
  next: string[][]
  PE?: boolean
  [key: string]: any
}

const GuideRowItem = ({ name, url }: { name: string; url: string }) => {
  return (
    <div
      className="guide-item"
      onClick={() =>
        window.open(url.indexOf('http') > -1 ? url : `https://${url}`, '_blank')
      }
    >
      {name}
    </div>
  )
}

export function Guide(props: { guide: GuideProps[] }) {
  const { guide } = props
  return (
    <div className="guide">
      {guide?.map((item: GuideProps, i: number) => {
        const { name, next } = item
        return (
          <div className="guide-module" key={i}>
            {name && <div className="title">{name}</div>}
            <div className="guide-next">
              {next?.map((child, j) => {
                const [name, url] = child
                return <GuideRowItem key={j} name={name} url={url} />
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
