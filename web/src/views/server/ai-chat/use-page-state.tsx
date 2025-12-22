import { useSetState } from '0hook'
import React from 'react'
import { useScrollBottom } from './helper'
import { AI } from './chat'
import { isArray } from 'asura-eye'
import { PageState } from './type'
import { SystemPrompt } from './conf'
import { req } from '@/util'
import { LLM } from './chat/llm'

export const usePageState = () => {
  const [historyRef, scrollBottom] = useScrollBottom()

  const [state, setState] = useSetState<PageState>(
    {
      // model: 'deepseek-chat',
      model: 'llama3.1',
      customModel: false,
      enabledRAG: true,
      apiKey: '',
      // url: 'https://api.deepseek.com/v1/chat/completions',
      url: 'ollama/chat',
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
  const chatIdRef = React.useRef(Date.now())

  const handleChat = async (userPrompt?: string) => {
    const message = userPrompt || state.userPrompt
    if(!message) return
    // const llm = LLM({
    //   url: 'http://localhost:2400/proxy-temp',
    //   // url: 'https://api.xiaomimimo.com/v1/chat/completions',
    //   // apiKey:'sk-cxn1mf4g58pw10vnaya1dswnvwnw5a8xowf03osiqd3op6ht',
    //   // model:'mimo-v2-flash',
    // })
    // // console.log(message, llm)
    // const res = await llm.sendMessage({
    //   messages: [{ role: 'user', content: '你是' }]
    // })
    // console.log("🚀 ~ handleChat ~ res:", res)
    // return 
    const ai = AI({
      chatId: chatIdRef.current,
      apiKey: state.apiKey,
      model: state.model,
      url: state.url,
      // tools,
      SystemPrompt,
      // functionCall,
      lang: localStorage.language === 'en' ? 'en_US' : 'zh_CN',
      config: {
        enabledRAG: state.enabledRAG,
      },
    })
    await ai?.handleChat({
      message,
      messages: state.messages,
      callback: (hty: any) => {
        if (hty) {
          hty.id = Date.now()
          if (!isArray(state.history)) state.history = []
          if (hty?.type === 'chunk') {
            if (hty.content && state.history.at(-1)?.type === 'chunk') {
              state.history.at(-1).content += hty.content
            } else {
              state.history.push(hty)
            }
          } else {
            state.history.push(hty)
          }
          setState(state)
          scrollBottom()
        }
      },
    })
  }

  const handleSteamStop = async () => {
    req({
      url: '/ollama/steam/chat/stop',
      method: 'post',
      params: {
        chatId: chatIdRef.current,
      },
    })
  }

  React.useEffect(() => {
    scrollBottom()
    let timer = setTimeout(() => {
      scrollBottom()
      clearTimeout(timer)
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return {
    state,
    setState,
    historyRef,
    handleChat,
    handleClearHistory,
    handleSteamStop,
  }
}
