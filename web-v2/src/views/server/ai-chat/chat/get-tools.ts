import { req } from '@/util'
import { isEffectArray } from 'asura-eye'
import { ChartTools } from './chart'

export const getToolsByRAG = async (message: string) => {
  try {
    const res = await req({
      method: 'post',
      url: 'rag/query',
      params: {
        message,
        tableName: 'tools',
      },
    })
    const { code, data } = res?.data || {}
    // console.log('RAG Data: ', data)
    if (code === 200) {
      return data?.[0]?.key
    }
  } catch (error) {
    console.error(error)
  }
  return ''
}

export const getTools = (flag: string, conf: any = {}) => {
  const { params = {}, props = {} } = conf
  const { tools = ChartTools } = props
  if (flag === 'nothing') return undefined
  const getTools = () => {
    if (params.tools) return params.tools || []
    if (params.expandTools)
      return [...tools, ...params.expandTools].filter(Boolean)
    return tools || []
  }
  const list = getTools()
  if (isEffectArray(list)) {
    for (let i = 0; i < list.length; i++) {
      const item: any = list[i]
      const name = item?.function?.name
      if (name === flag) {
        console.log(item)
        return [item]
      }
    }
  }

  return undefined
}
