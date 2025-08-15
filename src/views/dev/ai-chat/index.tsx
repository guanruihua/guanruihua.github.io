import { Div, Chart } from 'aurad'
import React from 'react'
import { usePageState } from './use-page-state'
import { Suggest } from './conf'
import { MD } from './md'
import './index.less'
import './markdown.less'
import { Left } from './left'
import { Right } from './right'
import { isString } from 'asura-eye'
import { Send, Arrow } from './assets'

export default function AIChat() {
  const { historyRef, state, setState, handleChat, handleClearHistory } =
    usePageState()
  const [loading, setLoading] = React.useState(false)
  // console.log(state)

  const handleUserChat = async (userPrompt?: string) => {
    if (loading) return
    setLoading(true)
    await handleChat(userPrompt)
    setLoading(false)
  }

  return (
    <div className="tool-ai-chat">
      <Left
        state={state}
        setState={setState}
        handleClearHistory={handleClearHistory}
      />
      <div className="chat-container">
        <div className="chat-history" ref={historyRef}>
          {state?.history?.map((item, i) => {
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
                    <Div className="think">
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
        <div className="user-prompt">
          <textarea
            value={state.userPrompt}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                e.preventDefault()
                handleUserChat()
              }
            }}
            onChange={(e) => {
              setState({
                userPrompt: e.target.value,
              })
            }}
          />
          <div className="user-prompt-controls">
            <Div
              className="btn-send"
              classNames={{ disabled: loading || !state?.userPrompt }}
              onClick={() => handleUserChat()}
            >
              {Send}
            </Div>
          </div>
        </div>
      </div>
      <Right Suggest={Suggest} handleUserChat={handleUserChat} />
    </div>
  )
}
