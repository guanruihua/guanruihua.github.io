import * as Vector from '../database'

export default [
  {
    path: '/vector/addTableData',
    // @ts-ignore (define in dts)
    post: async (params) => {
      const { tableName, data } = params
      return await Vector.addTableData(tableName, data)
    },
  },
  {
    path: '/vector/clearTable',
    // @ts-ignore (define in dts)
    post: async (params) => {
      const { tableName } = params
      return await Vector.clearTable(tableName)
    },
  },
  {
    path: '/vector/delTable',
    // @ts-ignore (define in dts)
    post: async (params) => {
      const { tableName } = params
      return await Vector.delTable(tableName)
    },
  },
  {
    path: '/vector/delTableData',
    // @ts-ignore (define in dts)
    post: async (params) => {
      const { tableName, data } = params
      return await Vector.delTableData(tableName, data)
    },
  },
  {
    path: '/vector/save2VectorDB',
    // @ts-ignore (define in dts)
    post: async (params) => {
      const { name = 'txt', textChunks } = params
      return await Vector.save2VectorDB(name, textChunks)
    },
  },
  {
    path: '/vector/genTextChunkVectors',
    // @ts-ignore (define in dts)
    post: async (params) => {
      const { name = 'txt', list } = params
      return list ? await Vector.genTextChunkVectors(name, list) : []
    },
  },
  {
    path: '/vector/genTextChunks',
    // @ts-ignore (define in dts)
    post: async (params) => {
      const { value } = params
      return value ? await Vector.genTextChunks(value) : []
    },
  },
  {
    path: '/vector/table/get',
    // @ts-ignore (define in dts)
    get: async (params) => {
      const { name } = params

      return name ? await Vector.getTableData(name) : []
    },
  },
  {
    path: '/vector/tableNames',
    // @ts-ignore (define in dts)
    get: async (params) => {
      return await Vector.getTableNames()
    },
  },
  {
    path: '/vector',
    // @ts-ignore (define in dts)
    post: async (params) => {
      const { message, verctorDB } = params
      return await Vector.getEmbedingResult(message, verctorDB)
    },
  },
]
