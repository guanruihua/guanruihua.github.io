import { Div } from 'aurad'
import React from 'react'
import { useNavigate } from 'react-router'
import { useEventListener } from './eventlistener'
import './index.less'

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

export function Guide(props: GuideProps) {
  const nav = useNavigate()

  const { guide, state } = props
  const { selects = [] } = state || {}
  const colWidth = 450

  const getNewColCount = () => {
    const w = window.document.body.getBoundingClientRect().width
    return Math.max(Math.floor(w / colWidth), 1)
  }

  const [colCount = 1] = useEventListener<number>(
    'resize',
    getNewColCount,
    getNewColCount(),
  )

  const canRenderGuide = guide.filter((_) =>
    _.type && selects.length > 0 ? selects.includes(_.type) : true,
  )

  const cols = new Array(colCount).fill('').map((_, i) => {
    return canRenderGuide.filter((_, j) => j % colCount === i)
  })

  const onClick = (url: string) => {
    if (url.indexOf('.') > -1)
      window.open(url.indexOf('http') > -1 ? url : `https://${url}`, '_blank')
    else nav(url)
  }
  return (
    <div className="home-guide">
      {cols.map((col, ci) => {
        return (
          <div
            key={ci}
            className="home-guide-col"
            style={{ width: 95 / colCount + '%' }}
          >
            {col?.map((item: GuideProps['guide']['0'], i: number) => {
              const { name, next } = item
              return (
                <Div className="guide-module" key={i}>
                  <div
                    className="bg"
                    style={{
                      background: 'url(/image/bg.png)',
                      backgroundAttachment: 'fixed',
                      backgroundSize: 'cover',
                      backgroundPosition: 'top',
                      filter: 'opacity(17%) blur(1px)',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: -1,
                    }}
                  />
                  {name && <div className="title">{name}</div>}
                  {next?.map((child, j) => {
                    const [name, url] = child
                    return (
                      <div
                        key={j}
                        className="guide-item"
                        onClick={() => onClick(url)}
                      >
                        {name}
                      </div>
                    )
                  })}
                </Div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
