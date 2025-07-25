import axios from 'axios'
import type { LLMProps, LLMResult, SendMessageProps } from '../type'
import { isEffectArray, isString } from 'asura-eye'
import { Model } from './conf'

export const LLM = (llmProps: LLMProps): LLMResult => {
  const { model, custom, apiKey } = llmProps

  let url = ''
  let AIModel = ''
  let required: string[] = []

  const ownModel = model && Model?.[model]
  if (ownModel) {
    url = ownModel.url
    AIModel = ownModel.model
    required = ownModel.required
  }

  if (custom) {
    custom?.url && (url = custom.url)
    custom?.model && (AIModel = custom.model)
    custom?.required && (required = custom.required)
  }

  if (required.includes('apiKey') && !isString(apiKey)) {
    console.error('LLM / Parameter apiKey are incorrect')
  }

  return {
    async sendMessage(props: SendMessageProps) {
      const { messages, tools, headers = {}, params = {} } = props

      if (required.includes('apiKey') && !isString(apiKey)) {
        console.error('LLM / sendMessage / Parameter apiKey are incorrect')
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
          model: AIModel,
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
