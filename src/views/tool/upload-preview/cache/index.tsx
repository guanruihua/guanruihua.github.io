import React from 'react'
import { openDB } from './open'

const genId = () => {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    },
  )
  return uuid
}

export interface UseIndexedDBProps {
  /**
   * @description
   */
  dbName?: string
  tableName?: string
}

export const useIndexedDB = (props?: UseIndexedDBProps) => {
  const { dbName = 'CacheDB', tableName = 'store' } = props || {}
  const [db, setDB] = React.useState<IDBOpenDBRequest | null>(null)
  const init = async () => {
    const value: any = await openDB(dbName, tableName)
    setDB(value)
  }

  React.useEffect(() => {
    init()
  }, [])

  return {
    db,
    getKey() {
      const uuid = genId()
      // if (this.getStore()?.get(uuid)?.result) {
      //   // 重新生成
      //   return this.getKey()
      // }
      return uuid
    },
    async getAll() {
      return new Promise((resolve) => {
        try {
          const list: any = []
          const req = this.getStore()?.openCursor()
          if (req) {
            req.onsuccess = function (e: any) {
              const cursor = e.target.result
              if (cursor) {
                list.push(cursor.value)
                cursor.continue()
              } else {
                resolve(list)
              }
            }
          }
        } catch (error) {
          resolve([])
        }
      })
    },
    getStore() {
      return (db as any)
        ?.transaction?.([tableName], 'readwrite')
        .objectStore(tableName)
    },
    get(key: string) {
      return this.getStore().get(key) || null
    },
    del(id: string) {
      this.getStore()?.delete(id)
    },
    add(value: any, key: string = this.getKey()) {
      this.getStore()?.add({ key, value })
      return { key, value }
    },
    update(value: any, key: string) {
      this.getStore()?.put({ value, key })
      return { key, value }
    },
  }
}
