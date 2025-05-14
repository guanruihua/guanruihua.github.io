import React from 'react'
import { Guide } from './type'

export function GuideRender(props: { guide: Guide[] }) {
  const GuideRowItem = ({ name, url }: { name: string; url: string }) => {
    return (
      <div
        className="guide-item"
        onClick={() =>
          window.open(
            url.indexOf('http') > -1 ? url : `https://${url}`,
            '_blank',
          )
        }
      >
        {name}
      </div>
    )
  }
  const { guide } = props
  return (
    <div className="guide">
      {guide.map((item: Guide, i: number) => {
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
