import { Div, Chart, Input, Button, Radio, Flex } from 'aurad'
import React from 'react'
import './index.less'
import { usePageState } from './use-page-state'

export default function AIChat() {
  const { historyRef, state, setState, handleChat, handleClearHistory } =
    usePageState()
  const [loading, setLoading] = React.useState(false)
  // console.log(state)

  const handleUserChat = async () => {
    if (loading) return
    setLoading(true)
    await handleChat()
    setLoading(false)
  }

  const handleSelectModel = (val: string) => {
    if (val === 'Custom') {
      setState({
        model: '',
        customModel: true,
      })
      return
    }
    setState({
      model: val,
      customModel: false,
    })
  }
  const handleSelectURL = (val: string) => {
    if (val === 'Custom') {
      setState({
        url: '',
        customURL: true,
      })
      return
    }
    setState({
      url: val,
      customURL: false,
    })
  }

  return (
    <div className="tool-ai-chat">
      <div className="left-aside">
        <Div className="ai-model">
          <div className="item">
            <div className="label"> Api Key</div>
            <Input
              value={state.apiKey}
              onChange={(e: any) =>
                setState({
                  apiKey: e.target.value,
                })
              }
            />
          </div>
          <div className="item">
            <div className="label">Model</div>
            <Flex className="model-box">
              {['deepseek-chat', 'deepseek-reasoner', 'Custom'].map((val) => (
                <Div
                  key={val}
                  className="item"
                  classNames={{
                    select: state.customModel
                      ? val === 'Custom'
                      : val === state.model,
                  }}
                  onClick={() => handleSelectModel(val)}
                >
                  {val}
                </Div>
              ))}
              {state.customModel && (
                <Input
                  value={state.model}
                  onChange={(e: any) =>
                    setState({
                      model: e.target.value,
                    })
                  }
                />
              )}
            </Flex>
          </div>
          <div className="item">
            <div className="label">URL</div>
            <Flex className="url-box">
              {['https://api.deepseek.com/v1/chat/completions', 'Custom'].map(
                (val) => (
                  <Div
                    key={val}
                    className="item"
                    classNames={{
                      select: state.customURL
                        ? val === 'Custom'
                        : val === state.url,
                    }}
                    onClick={() => handleSelectURL(val)}
                  >
                    {val}
                  </Div>
                ),
              )}
              {state.customURL && (
                <Input
                  value={state.url}
                  onChange={(e: any) =>
                    setState({
                      url: e.target.value,
                    })
                  }
                />
              )}
            </Flex>
          </div>
        </Div>

        <Button onClick={handleClearHistory}>Clear History</Button>
      </div>
      <div className="chat-container">
        <div className="chat-history" ref={historyRef}>
          {state?.history?.map((item, i) => {
            const { role, content, chartOptions, toolType } = item
            if (chartOptions)
              return (
                <Div key={i} classNames={[role, 'chart', toolType]}>
                  <Chart style={{ minHeight: 300 }} options={chartOptions} />
                </Div>
              )
            return (
              <Div key={i} className={role}>
                <div className="content">{content}</div>
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
              onClick={handleUserChat}
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
      <div className="right-aside"></div>
    </div>
  )
}
