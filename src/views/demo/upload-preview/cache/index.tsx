import React from 'react'
import { openDB } from './open'
import { UseIndexedDBProps, IndexedDBItem, IndexedDBAddItem } from './type'
import { genKey } from './gen-key'

export const useIndexedDB = (props?: UseIndexedDBProps) => {
  const { dbName = 'CacheDB', tableName = 'store', callback = {} } = props || {}
  const ref = React.useRef<IDBOpenDBRequest | null>(null)
  const init = async () => {
    try {
      const value: any = await openDB(dbName, tableName)
      if (value) {
        ref.current = value
        callback?.afterInitSuccess?.(value)
      }
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    init()
  }, [])

  return {
    ref,
    getStore() {
      if (ref.current)
        return (ref.current as any)
          ?.transaction?.([tableName], 'readwrite')
          .objectStore(tableName)
      return null
    },
    getKey(): string {
      return genKey()
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
                    const aa = a?.sort || 1
                    const bb = b?.sort || 1
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
      if (!item.sort) {
        item.sort = new Date().getTime()
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
