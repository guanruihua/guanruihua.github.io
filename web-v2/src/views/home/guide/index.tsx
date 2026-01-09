import { Div } from 'aurad'
import { useNavigate } from 'react-router'
import { useEventListener } from './eventlistener'
import PinyinMatch from 'pinyin-match'
import './index.less'
import { isEffectArray, isString } from 'asura-eye'

export interface GuideProps {
  guide: {
    name?: string
    type?: string
    next: string[][]
    show?: boolean
  }[]
  state?: {
    selects?: string[]
    [key: string]: any
  }
  [key: string]: any
}

const Module = (item: {
  name: string
  show?: boolean
  next: any[]
  onClick: any
}) => {
  const { name, next, show = true, onClick } = item

  return (
    <Div className="guide-module" none={show == false}>
      <div
        className="bg"
        style={{
          background: 'url(/image/bg.png)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          filter: 'opacity(17%) blur(1px)',
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      />
      {name && <div className="title">{name}</div>}
      {next?.map((child: any[], j) => {
        const [name, url, show = true] = child
        return (
          <Div
            key={j}
            none={show === false}
            className="guide-item"
            onClick={() => onClick(url)}
          >
            {name}
          </Div>
        )
      })}
    </Div>
  )
}

export function Guide(props: GuideProps) {
  const nav = useNavigate()

  const { guide, state, setState } = props
  const { selects = [], search, history = {}, historyList = [] } = state || {}
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
    return canRenderGuide.filter((_: any, j) => {
      if (isString(search) && search.length && isEffectArray(_.next)) {
        try {
          _.next.forEach((item: any[]) => {
            item[2] = PinyinMatch.match(item[0], search.trim()) !== false
          })
          _.show = Boolean(
            _.next.map((item: any[]) => item[2]).filter(Boolean).length,
          )
        } catch (error) {
          console.error(error)
        }
      }
      return j % colCount === i
    })
  })

  const getName = (url: string) => {
    console.log('🚀 ~ getName ~ url:', url)

    try {
      for (let i = 0; i < canRenderGuide.length; i++)
        for (let j = 0; j < canRenderGuide[i].next.length; j++)
          if (canRenderGuide[i].next[j][1] === url)
            return canRenderGuide[i].next[j][0]
    } catch {
      return url
    }
    return url
  }

  const onClick = (url: string) => {
    if (url.indexOf('.') > -1)
      window.open(url.indexOf('http') > -1 ? url : `https://${url}`, '_blank')
    else nav(url)
    const new_history = {
      ...history,
    }
    if (new_history[url]) {
      new_history[url]++
    } else {
      new_history[url] = 1
    }
    setState({
      history: new_history,
      historyList: Object.entries(new_history)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 15)
        .map(([url]) => [getName(url), url]),
    })
  }

  // const list = console.log(list, canRenderGuide)

  return (
    <div className="home-container">
      <div className="home-guide">
        <Div className="home-guide-history" none={!isEffectArray(historyList)}>
          <Module
            name="常用"
            next={historyList}
            onClick={onClick}
            show={false}
          />
        </Div>
        {cols.map((col, ci) => {
          return (
            <Div
              key={ci}
              className="home-guide-col"
              // style={{ width: 95 / colCount + '%' }}
            >
              {col?.map((item: GuideProps['guide']['0'], i: number) => (
                <Module key={i} {...(item as any)} onClick={onClick} />
              ))}
            </Div>
          )
        })}
      </div>
    </div>
  )
}
