import { Div, Chart } from 'aurad'
import React, { MouseEventHandler } from 'react'
import { usePageState } from './use-page-state'
import { Suggest } from './conf'
import { MD } from './md'
import './index.less'
import './markdown.less'
import { Left } from './left'
import { Right } from './right'
import { isString } from 'asura-eye'

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
            const { id, role, content, chartOptions, toolType } = item
            if (chartOptions)
              return (
                <Div key={id} classNames={[role, 'chart', toolType]}>
                  <Chart style={{ minHeight: 300 }} options={chartOptions} />
                </Div>
              )
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
                      <svg
                        className="think-control-arrow"
                        xmlns="http://www.w3.org/2000/svg"
                        width="0.5em"
                        height="1em"
                        viewBox="0 0 12 24"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"
                        ></path>
                      </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20.04 2.323c1.016-.355 1.992.621 1.637 1.637l-5.925 16.93c-.385 1.098-1.915 1.16-2.387.097l-2.859-6.432l4.024-4.025a.75.75 0 0 0-1.06-1.06l-4.025 4.024l-6.432-2.859c-1.063-.473-1-2.002.097-2.387z"
                ></path>
              </svg>
            </Div>
          </div>
        </div>
      </div>
      <Right Suggest={Suggest} handleUserChat={handleUserChat} />
    </div>
  )
}
