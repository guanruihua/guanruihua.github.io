import React from 'react'
import { Div, Chart } from 'aurad'
import { MD } from './md'
import './index.less'
import './markdown.less'
import { isString } from 'asura-eye'
import { Arrow } from './assets'

export interface HistoryProps {
  [key: string]: any
}

export function History(props: HistoryProps) {
  const { state, historyRef } = props
  return (
    <div className="chat-history" ref={historyRef}>
      {state?.history?.map((item: any) => {
        const { id, role = '', content, chartOptions, toolType } = item
        if (chartOptions)
          return (
            <Div key={id} classNames={[role, 'chart', toolType]}>
              <Chart style={{ minHeight: 300 }} options={chartOptions} />
            </Div>
          )
        if (role.includes('rag')) {
          return (
            <Div key={id} className={role}>
              <Div className="think-box">
                <div
                  className="think-control"
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    const val = e.currentTarget?.dataset?.value
                    if (val === 'bottom') {
                      e.currentTarget.dataset.value = ''
                    } else {
                      e.currentTarget.dataset.value = 'bottom'
                    }
                  }}
                >
                  <span className="think-control-label">RAG</span>
                  {Arrow}
                </div>
                <Div className="think content rag">
                  <MD value={content} />
                </Div>
              </Div>
            </Div>
          )
        }
        if (
          isString(content) &&
          ((content.includes('<think>') && content.includes('</think>')) ||
            content.indexOf('<think>') === 0)
        ) {
          const [think, mdContent] = content
            .replace(/^<think>/, '')
            .split('</think>')
          return (
            <Div key={id} className={role}>
              <Div none={!think} className="think-box">
                <div
                  className="think-control"
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    const val = e.currentTarget?.dataset?.value
                    if (val === 'bottom') {
                      e.currentTarget.dataset.value = ''
                    } else {
                      e.currentTarget.dataset.value = 'bottom'
                    }
                  }}
                >
                  <span className="think-control-label">Deep Thinking</span>
                  {Arrow}
                </div>
                <Div none={!think} className="think">
                  <MD value={think} />
                </Div>
              </Div>
              <div className="content markdown">
                <MD value={mdContent} />
              </div>
            </Div>
          )
        }
        return (
          <Div key={id} className={role}>
            <div className="content markdown">
              <MD value={content} />
            </div>
          </Div>
        )
      })}
    </div>
  )
}
