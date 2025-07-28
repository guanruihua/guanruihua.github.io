import axios from 'axios'
import type { LLMProps, LLMResult, SendMessageProps } from './type'
import { isEffectArray } from 'asura-eye'

export const LLM = (llmProps: LLMProps): LLMResult => {
  const { url, model, apiKey } = llmProps

  return {
    async sendMessage(props: SendMessageProps) {
      const { messages, tools, headers = {}, params = {} } = props

      if (!url) {
        console.error('LLM / sendMessage / Parameter url are required')
        return {}
      }
      if (!isEffectArray(messages)) {
        console.error('LLM / sendMessage / Parameter messages are incorrect')
        return {}
      }

      if (tools && !isEffectArray(tools)) {
        console.error('LLM / sendMessage / Parameter tools are incorrect')
        return {}
      }

      if (isEffectArray(tools) && !params.tools) {
        params.tools = tools
      }

      if (apiKey && !headers.Authorization) {
        headers.Authorization = `Bearer ${apiKey}`
      }

      const res = await axios.post(
        url,
        {
          model,
          messages,
          stream: false,
          ...params,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
        },
      ).catch(error => {
        console.error(error)
        return {} as any
      })

      return res?.data?.choices?.[0]?.message
    },
  }
}
