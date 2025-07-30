import { useSetState } from '0hook'
import React from 'react'
import { useScrollBottom } from './helper'
import { AI } from './chat'
import { isArray } from 'asura-eye'
import { PageState } from './type'

export const usePageState = () => {
  const [historyRef, scrollBottom] = useScrollBottom()

  const [state, setState] = useSetState<PageState>(
    {
      model: 'deepseek-chat',
      customModel: false,
      apiKey: '',
      url: 'https://api.deepseek.com/v1/chat/completions',
      customURL: false,
      selectModelType: '',
      userPrompt: '你好',
      messages: [],
      history: [],
    },
    'tool/ai-chat/cache',
  )

  const handleClearHistory = () => {
    setState({
      history: [],
    })
  }

  const handleChat = async () => {
    if (!state.userPrompt || !state.apiKey) return

    const ai = AI({
      apiKey: state.apiKey,
      model: state.model,
      url: state.url,
      // tools,
      // SystemPrompt,
      // ChartToolTypes,
      // functionCall,
      lang: localStorage.language === 'en' ? 'en_US' : 'zh_CN',
    })
    await ai?.handleChat({
      message: state.userPrompt,
      messages: state.messages,
      // callbackMessages: (oldMessages:any) => setState({ messages: oldMessages }),
      callback: (hty: any) => {
        if (hty) {
          if (!isArray(state.history)) state.history = []
          state.history.push(hty)
          setState(state)
          scrollBottom()
        }
      },
    })
  }

  const init = async () => {
    scrollBottom()
  }

  React.useEffect(() => {
    init()
  }, [])

  return {
    state,
    setState,
    historyRef,
    handleChat,
    handleClearHistory,
  }
}
