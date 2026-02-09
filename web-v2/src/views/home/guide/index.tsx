import { Div } from 'aurad'
import { useNavigate } from 'react-router'
import { useEventListener } from './eventlistener'
import PinyinMatch from 'pinyin-match'
import './index.less'
import { isArray, isEffectArray, isString } from 'asura-eye'
import { Module } from './module'
import { State } from '../type'
import { calculateScore } from '../helper'

export interface GuideProps {
  guide: {
    name?: string
    type?: string
    next: string[][]
    show?: boolean
  }[]
  state?: State
  [key: string]: any
}

export function Guide(props: GuideProps) {
  const nav = useNavigate()

  const { guide, state, setState } = props
  const {
    selects = [],
    search,
    lastVisitHistory,
    historyList = [],
  } = state || {}
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

  const canRenderGuide = guide.filter((_) => {
    if (_.type && selects.length > 0) {
      return selects.includes(_.type)
    }
    return true
  })

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
    // console.log('🚀 ~ getName ~ url:', url)

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

    const new_lastVisitHistory: State['lastVisitHistory'] = {
      ...lastVisitHistory,
    }

    const now = new Date().getTime()
    if (isArray<number>(new_lastVisitHistory[url])) {
      new_lastVisitHistory[url].unshift(now)
    } else {
      new_lastVisitHistory[url] = [now]
    }

    setState({
      lastVisitHistory: new_lastVisitHistory,
      historyList: Object.keys(new_lastVisitHistory)
        .sort(
          (ka: any, kb: any) =>
            calculateScore(new_lastVisitHistory[kb]) -
            calculateScore(new_lastVisitHistory[ka]),
        )
        .slice(0, 15)
        .map((url) => [getName(url), url]),
    })
  }

  const historyShow = isArray(historyList) && historyList.length > 0
  // console.log('🚀 ~ Guide ~ historyShow:', historyShow, historyList)

  return (
    <div className="home-container">
      <div
        className="home-guide"
        style={{
          gridTemplateColumns: `repeat(${colCount}, 1fr)`,
        }}
      >
        <Div
          className="home-guide-history"
          style={{ display: 'block !important' }}
          none={!historyShow}
        >
          <Module
            name="常用"
            next={historyList.filter((item) => {
              if (search) {
                return PinyinMatch.match(item[0], search.trim()) !== false
              }
              return true
            })}
            onClick={onClick}
            show={historyShow}
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
