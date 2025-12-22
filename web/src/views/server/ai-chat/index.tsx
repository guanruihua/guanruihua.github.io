import React from 'react'
import { Div } from 'aurad'
import { usePageState } from './use-page-state'
import { Suggest } from './conf'
import './index.less'
import './markdown.less'
import { Left } from './left'
import { Right } from './right'
import { Send } from './assets'
import { Loading } from '@/components'
import { History } from './history'

export default function AIChat() {
  const { historyRef, state, setState, handleChat, handleClearHistory, handleSteamStop } =
    usePageState()
  const [loading, setLoading] = React.useState(false)
  // console.log(state)

  const handleStop = async () => {
    handleSteamStop()
    setLoading(false)
  }

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
        handleStop={handleStop}
      />
      <div className="chat-container">
        <History state={state} historyRef={historyRef} />
        <div className="user-prompt">
          <Loading loading={loading}>
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
          </Loading>
        </div>
      </div>
      <Right
        loading={loading}
        Suggest={Suggest}
        handleUserChat={handleUserChat}
      />
    </div>
  )
}
