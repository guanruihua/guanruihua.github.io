import { isString } from 'asura-eye'
import { getArgs, isDrawChartTool } from './utils'
import { toChartOptions, ChartTools } from './chart/index'
import { MessageType, History, AIProps, AIChatParams } from './type'
import { useI18n } from './i18n'
import { LLM } from './llm'
import { getRagContent } from './rag'
import { sse } from './sse'
export * from './type'

export const AI = (props: AIProps) => {
  const {
    model,
    url,
    apiKey,
    SystemPrompt,
    lang = 'en_US',
    addChartTool = true,
    functionCall = {},
    config = {},
  } = props
  const { t } = useI18n(lang)
  let { tools = ChartTools } = props

  const handleChat = async (params: AIChatParams) => {
    const llm = LLM({ model, url, apiKey })

    if (!llm) {
      console.error('LLM init error')
      return
    }
    const { message, messages = [], callback, callbackMessage } = params

    if (message) {
      messages.push({ role: 'user', content: message })
    }
    callback?.({
      role: 'user',
      content: message,
    })
    let RAGContent = undefined
    if (config.enabledRAG) {
      const content = await getRagContent(message)
      callback?.({
        role: 'assistant rag',
        content,
      })
      RAGContent = content
    }

    if (RAGContent) {
      messages.unshift({ role: 'system', content: RAGContent })
    }

    if (SystemPrompt) {
      messages.unshift({ role: 'system', content: SystemPrompt })
    }

    if (messages.length === 0) return undefined

    const getTools = () => {
      if (params.tools) return params.tools || []
      if (params.expandTools)
        return [...tools, ...params.expandTools].filter(Boolean)
      return tools || []
    }
    const llm_tools = getTools()
    const msg = await llm.sendMessage({
      messages,
      tools: llm_tools,
    })
    console.log('llm: ', msg)
    messages.push(msg as MessageType)

    const handleToolCall = async (msg: any) => {
      console.log(
        '🚀 ~ handleToolCall ~ msg/tool_calls/0:',
        msg?.tool_calls?.[0],
      )

      const tool_call = msg?.tool_calls?.[0]
      const fn = tool_call?.function

      if (isString(fn?.name)) {
        const args = getArgs(fn.arguments)

        let fnContent = ''
        if (isDrawChartTool(fn.name)) {
          console.log(fn.name)
          try {
            const hty: History = {
              role: 'assistant',
              content: '',
              toolType: fn.name,
              chartTitle: args?.title,
              chartData: args?.data,
            }
            if (addChartTool) {
              hty.chartOptions = toChartOptions(fn.name, { lang, ...args })
            }

            callback?.(hty)
            fnContent = 'Please analyze the data of ' + args.data
            // fnContent =
            //   t('drawChart') +
            //   `;You don't need to say you don't have drawing skills;` +
            //   'data:' +
            //   (args?.data || '')
          } catch (error) {
            console.error(error)
          }
        } else if (functionCall[fn.name]) {
          const func = functionCall[fn.name]

          callback?.({
            role: 'assistant',
            content: t('startFindData'),
            toolType: 'assistant-process',
          })
          fnContent = await func(args)
          callback?.({
            role: 'assistant',
            content: t('endFindData'),
            toolType: 'assistant-process',
          })
        }

        if (!isString(fnContent)) {
          fnContent = JSON.stringify(fnContent)
        }

        if (isString(model) && model?.indexOf('llama3') === 0) {
          await sse({
            url: 'http://localhost:2400/ollama/steam/chat',
            callback,
            messages: [
              {
                role: 'system',
                content: SystemPrompt as any,
              },
              {
                role: 'user',
                // content: fnContent,
                content: `Summarize based on information ${RAGContent} with ${message}`,
              },
            ],
          })

          return
        } else {
          messages.push({
            role: 'tool',
            tool_call_id: tool_call.id,
            name: fn.name,
            // content: fnContent + '; 已经绘制图表, 禁止后续调用tools',
            content: fnContent,
          })
          const msgNext = await llm.sendMessage({ messages, tools: llm_tools })

          console.log('🚀 ~ handleToolCall ~ msgNext:', msgNext)

          return await handleToolCall(msgNext)
        }
      } else {
        callbackMessage?.(messages)
        return callback?.({
          role: 'assistant',
          content: msg?.content || '',
        })
      }
    }
    return await handleToolCall(msg)
  }

  return {
    handleChat,
  }
}
