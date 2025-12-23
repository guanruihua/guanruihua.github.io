import { getEmbedingResult, getEmbedingResults } from '../database'
// import { ChartTools } from '../controller/chart'

const chat_rag_name = 'tools'
const data_rag_name = 'data-tools'

export default [
  {
    path: '/rag/query/data',
    // @ts-ignore (define in dts)
    post: async (params) => {
      const { message } = params
      const results = await getEmbedingResults(message, data_rag_name)
      const flag = results?.[0]?.key
      // for (let i = 0; i < ChartTools.length; i++) {
      //   const item = ChartTools[i]
      //   if (item.function.name === flag) return item
      // }
      return flag
    },
  },
  {
    path: '/rag/query/chat/params',
    // @ts-ignore (define in dts)
    post: async (params) => {
      const { message } = params
      const results = await getEmbedingResults(message, chat_rag_name)
      const flag = results?.[0]?.key

      // for (let i = 0; i < ChartTools.length; i++) {
      //   const item = ChartTools[i]
      //   if (item.function.name === flag) return item
      // }
      return undefined
    },
  },
  {
    path: '/rag/query',
    // @ts-ignore (define in dts)
    post: async (params) => {
      const { message, tableName } = params
      return await getEmbedingResults(message, tableName)
    },
  },
  {
    path: '/rag',
    // @ts-ignore (define in dts)
    post: async (params) => {
      const { message, verctorDB } = params
      return await getEmbedingResult(message, verctorDB)
    },
  },
]
