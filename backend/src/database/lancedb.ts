import * as lancedb from '@lancedb/lancedb'
import { isObject } from 'asura-eye'
import { getEmbedding } from './helper/getEmbedding'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

const RAGTableName: string = process.env.RAG_TableName || 'RAG'
const DBConnectPath: string  = process.env.RAG_ConnectPath || './Data'
const limit: number = Number(process.env.RAG_Limit) || 5

export const getEmbedingResult = async (
  prompt: string,
  name: string = RAGTableName,
) => {
  // await initDB()
  const db = await lancedb.connect(DBConnectPath)
  const table = await db.openTable(name)
  // await table.delete('id = 1')
  const vectors = await getEmbedding(prompt)
  const results = await table.vectorSearch(vectors).limit(limit).toArray()
  const values = results.map((item) => {
    return item.text
  })
  console.log('getEmbedingResult / length: ', values.length)

  return values
}

export const getEmbedingResults = async (
  prompt: string,
  name: string = RAGTableName,
) => {
  // await initDB()
  const db = await lancedb.connect(DBConnectPath)
  const table = await db.openTable(name)
  // await table.delete('id = 1')
  const vectors = await getEmbedding(prompt)
  const results = await table.vectorSearch(vectors).limit(limit).toArray()

  console.log('getEmbedingResult / length: ', results.length)

  return results
}

// query('you known AppPulse+')
// console.time('running')
// await query('Introducing AppPulse+')
// console.timeEnd('running')

export const getTableNames = async () => {
  const db = await lancedb.connect(DBConnectPath)
  const res = await db.tableNames()
  console.log('getTableNames: ', res)
  return await db.tableNames()
}

export const getTableData = async (tableName: string) => {
  const db = await lancedb.connect(DBConnectPath)
  const table = await db.openTable(tableName)
  const results = await table.query().toArray()
  console.log('getTableData / length: ', results?.length)
  return results
}

export const delTable = async (tableName: string) => {
  const db = await lancedb.connect(DBConnectPath)
  await db.dropTable(tableName)
  console.log('delTable / tableName: ', tableName)
  return ''
}

export const clearTable = async (tableName: string) => {
  const db = await lancedb.connect(DBConnectPath)
  const table = await db.openTable(tableName)
  await table.delete('1 = 1')
  console.log('clearTable / tableName: ', tableName)
  return ''
}

export const delTableData = async (tableName: string, data: any[]) => {
  const db = await lancedb.connect(DBConnectPath)
  const table = await db.openTable(tableName)
  for (let i = 0; i < data.length; i++) {
    const { id } = data[i]
    await table.delete(`id = '${id}'`)
  }
  // const ids = data.map((_) => `'${_.id}'`).join(',')
  // const results = await table.delete(`id in ${ids}`)
  console.log('delTableData / tableName, data: ', tableName, data)
  // console.log('delTableData / result: ', results)
  return ''
}

export const addTableData = async (tableName: string, data: any) => {
  const db = await lancedb.connect(DBConnectPath)
  const table = await db.openTable(tableName)
  table.add(data)
  console.log('addTableData / tableName, data: ', tableName, data)
  // console.log('addTableData / result: ', results)
  // return results
}

export const genTextChunks = async (text: string) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 300,
    chunkOverlap: 50,
  })
  const textChunks = await splitter.splitText(text)

  return textChunks
}

export const genTextChunkVectors = async (name: string, textChunks: any[]) => {
  return await Promise.all(
    textChunks.map(async (value, i) => {
      if (isObject(value)) {
        const { text, key = name } = value
        return {
          id: `doc_${name}_${Date.now()}_${i}`,
          vector: await getEmbedding(text),
          name: value?.name || name,
          key,
          text,
        }
      }

      return {
        id: `doc_${name}_${Date.now()}_${i}`,
        vector: await getEmbedding(value),
        name,
        key: name,
        text: value,
      }
    }),
  )
}

export const save2VectorDB = async (name: string, textChunks: any[]) => {
  const vectors = await genTextChunkVectors(name, textChunks)
  const db = await lancedb.connect(DBConnectPath)
  const tableNames = await db.tableNames()
  if (tableNames.includes(name)) {
    const table = await db.openTable(name)
    table.add(vectors)
  } else {
    await db.createTable(name, vectors)
  }
  return
}
