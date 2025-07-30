import { isString } from 'asura-eye'
import { getArgs } from './utils'
import { toChartOptions, ChartTools, OwnChartToolTypes } from './chart/index'
import { MessageType, History, AIProps, AIChatParams } from './type'
import { t } from './i18n'
import { LLM } from './llm'
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
  } = props
  let { tools = [], ChartToolTypes = [] } = props

  // 把绘制图表的tools 注册到 tools 和 ChartToolTypes 中
  if (addChartTool) {
    const userToolTypes = tools
      .map((item) => item.function.name)
      .filter(Boolean)
    OwnChartToolTypes.forEach((key: string, i: number) => {
      if (userToolTypes.includes(key) || ChartToolTypes.includes(key)) return
      ChartToolTypes.push(key)
      tools.push(ChartTools[i])
    })
  }

  
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

    if (SystemPrompt) {
      messages.unshift({ role: 'system', content: SystemPrompt })
    }

    if (messages.length === 0) return undefined

    callback?.({
      role: 'user',
      content: message,
    })

    const getTools = () => {
      if (params.tools) return params.tools
      if (params.expandTools) return [...tools, ...params.expandTools]
      return tools
    }
    const llm_tools = getTools()
    const msg = await llm.sendMessage({ messages, tools: llm_tools })
    messages.push(msg as MessageType)

    // console.log('msg:', msg)

    const handleToolCall = async (msg: any) => {
      const tool_call = msg?.tool_calls?.[0]
      const fn = tool_call?.function
      // console.log('tool_call:', fn, tool_call)

      if (isString(fn?.name)) {
        const args = getArgs(fn.arguments)
        let fnContent = ''

        if (ChartToolTypes.includes(fn.name)) {
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
            fnContent = t(lang, 'drawChart')
          } catch (error) {
            console.error(error)
          }
        } else if (functionCall[fn.name]) {
          const func = functionCall[fn.name]

          callback?.({
            role: 'assistant',
            content: t(lang, 'startFindData'),
            toolType: 'assistant-process',
          })
          fnContent = await func(args)
          callback?.({
            role: 'assistant',
            content: t(lang, 'endFindData'),
            toolType: 'assistant-process',
          })
        }

        if (!isString(fnContent)) {
          fnContent = JSON.stringify(fnContent)
        }

        // 把函数执行结果返回给 AI
        messages.push({
          role: 'tool',
          tool_call_id: tool_call.id,
          name: fn.name,
          content: fnContent,
        })
        // console.log(args, fn.name)
        // console.log({ fnContent })
        const msgNext = await llm.sendMessage({ messages, tools: llm_tools })
        messages.push(msgNext as MessageType)

        return await handleToolCall(msgNext)
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
