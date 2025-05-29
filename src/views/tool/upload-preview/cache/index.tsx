import React from 'react'
import { openDB } from './open'
import { UseIndexedDBProps, IndexedDBItem, IndexedDBAddItem } from './type'

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
    getKey(): string {
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
                resolve(
                  list.sort((a: any, b: any) => {
                    const aa = a?.info?.sort || 1
                    const bb = b?.info?.sort || 1
                    return aa - bb
                  }),
                )
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
    async get(key: string): Promise<IndexedDBItem | null> {
      return new Promise((resolve) => {
        const req = this.getStore().get(key) || null
        if (req) {
          req.onsuccess = function (event: any) {
            resolve(event.target.result)
          }
          req.onerror = function (event: any) {
            resolve(null)
          }
        } else {
          resolve(null)
        }
      })
    },
    del(key: string) {
      this.getStore()?.delete(key)
    },
    add(item: IndexedDBAddItem): IndexedDBItem {
      if (!item.key) item.key = this.getKey()
      if (!item.info) {
        item.info = {}
      }
      if (!item.info.sort) {
        item.info.sort = new Date().getTime()
      }
      this.getStore()?.add(item)
      return item as IndexedDBItem
    },
    update(item: IndexedDBItem): IndexedDBItem {
      this.getStore()?.put(item)
      return item
    },
  }
}
