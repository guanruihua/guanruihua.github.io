import { isString } from 'asura-eye'
import { getArgs } from './utils'
import { toChartOptions, ChartTools, OwnChartToolTypes } from './chart/index'
import { MessageType, History, AIProps, AIChatParams } from './type'
import { t } from './i18n'
import { LLM } from './llm'
import axios from 'axios'
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

    if (config.enabledRAG) {
      try {
        const rag_res = await axios.post(' http://localhost:2400/rag', {
          // message: 'Introducing AppPulse+',
          message,
        })
        console.log('RAG Data: ', rag_res.data)
        if (rag_res?.data?.code === 200) {
          const data = rag_res?.data?.data
          const content = `你是一个客服助手，请严格根据以下信息回答：${JSON.stringify(
            data,
          )}`
          messages.unshift({ role: 'system', content })
        }
      } catch (error) {
        console.error(error)
      }
    }

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
    const msg = await llm.sendMessage({
      messages,
      tools: llm_tools,
    })
    console.log('llm: ', msg)
    messages.push(msg as MessageType)

    // console.log('msg:', msg)

    const handleToolCall = async (msg: any) => {
      console.log('🚀 ~ handleToolCall ~ msg:', msg)

      const tool_call = msg?.tool_calls?.[0]
      const fn = tool_call?.function
      // console.log('tool_call:', fn, tool_call)

      if (isString(fn?.name)) {
        const args = getArgs(fn.arguments)
        // console.log('tool_call / args?.data:', args?.data)

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
          // content: fnContent + '; 已经绘制图表, 禁止后续调用tools',
          content: fnContent,
        })
        // console.log(args, fn.name)
        // console.log({ fnContent })
        const msgNext = await llm.sendMessage({ messages, tools: llm_tools })
        // const nextMessages = [
        //   // {
        //   //   role: 'tool',
        //   //   tool_call_id: tool_call.id,
        //   //   name: fn.name,
        //   //   // content: fnContent + '; 已经绘制图表, 禁止后续调用tools',
        //   //   content: fnContent,
        //   // },
        //   {
        //     role: 'user',
        //     // content: `已经根据${fn.arguments}绘制表格, 请分析数据, 不需要触发tools, 禁止再触发tools`
        //     // content: '你是',
        //     content: `请分析${fn.arguments}数据, 该数据已经可视化`,
        //   },
        // ]
        // if (SystemPrompt) {
        //   nextMessages.unshift({
        //     role: 'system',
        //     // content: '这是一个全新对话, 禁止调用tools',
        //     content: SystemPrompt,
        //   })
        // }
        // const msgNext = await llm.sendMessage({
        //   // model: 'llama.3.1',
        //   // model: 'deepseek-r1:14b',
        //   // tools: llm_tools,
        //   messages,
        //   // messages: nextMessages,
        // })
        // messages.push(msgNext as MessageType)

        console.log('🚀 ~ handleToolCall ~ msgNext:', msgNext)

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
