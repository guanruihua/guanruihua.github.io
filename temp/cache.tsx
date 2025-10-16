import axios from 'axios'
import { addLocale } from 'umi'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'

// class JSONCache {
//   private dbName: string
//   private storeName: string
//   private db: IDBDatabase | null = null
//   private isOpening: boolean = false
//   private openPromise: Promise<IDBDatabase> | null = null
//   private lastActivityTime: number = Date.now()

//   constructor(dbName: string, storeName: string) {
//     this.dbName = dbName
//     this.storeName = storeName
//     this.setupEventListeners()
//   }

//   // 初始化事件监听
//   private setupEventListeners() {
//     // 页面卸载时关闭连接
//     window.addEventListener('beforeunload', () => this.close())

//     // 监听页面恢复
//     window.addEventListener('pageshow', (event) => {
//       if (event.persisted) {
//         this.reconnect()
//       }
//     })
//   }

//   // 打开数据库 (带重试机制)
//   async open(): Promise<IDBDatabase> {
//     if (this.db) {
//       return this.db
//     }

//     if (this.isOpening) {
//       return this.openPromise!
//     }

//     this.isOpening = true
//     this.openPromise = new Promise((resolve, reject) => {
//       const request = indexedDB.open(this.dbName, 1)

//       request.onerror = (event: Event) => {
//         this.isOpening = false
//         const error = (event.target as IDBRequest).error
//         console.error('Open DB error:', error)
//         reject(`Open DB error: ${error}`)
//       }

//       request.onsuccess = (event: Event) => {
//         this.db = (event.target as IDBRequest).result
//         this.isOpening = false

//         // 监听版本变化
//         this.db.onversionchange = () => {
//           console.log('Database version changed, closing connection')
//           this.close()
//         }

//         // 监听异常关闭
//         this.db.onabort = () => {
//           console.warn('Database connection aborted')
//           this.close()
//         }

//         // 监听错误
//         this.db.onerror = (event: Event) => {
//           console.error('Database error:', (event.target as IDBRequest).error)
//         }

//         resolve(this.db)
//       }

//       request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
//         const db = (event.target as IDBRequest).result
//         if (!db.objectStoreNames.contains(this.storeName)) {
//           const store = db.createObjectStore(this.storeName, { keyPath: 'id' })
//           store.createIndex('timestamp', 'timestamp', { unique: false })
//         }
//       }

//       request.onblocked = () => {
//         console.warn('Database is blocked by other tabs')
//         // 可以提示用户关闭其他标签页
//       }
//     })

//     return this.openPromise
//   }

//   // 安全执行数据库操作
//   private async executeOperation<T>(operation: (db: IDBDatabase) => Promise<T>): Promise<T> {
//     this.lastActivityTime = Date.now()

//     try {
//       const db = await this.open()
//       return await operation(db)
//     } catch (error) {
//       if (this.isConnectionError(error)) {
//         console.warn('Connection error, attempting to reconnect...')
//         await this.close()
//         await new Promise((resolve) => setTimeout(resolve, 500))
//         return this.executeOperation(operation)
//       }
//       throw error
//     }
//   }

//   // 判断是否为连接错误
//   private isConnectionError(error: any): boolean {
//     return (
//       error &&
//       (error.name === 'InvalidStateError' ||
//         error.name === 'UnknownError' ||
//         error.message.includes('connection') ||
//         error.message.includes('关闭') ||
//         error.message.includes('断开'))
//     )
//   }

//   // 保存数据
//   async save(id: string, jsonData: any): Promise<number> {
//     return this.executeOperation((db) => {
//       return new Promise((resolve, reject) => {
//         const transaction = db.transaction([this.storeName], 'readwrite')
//         const store = transaction.objectStore(this.storeName)

//         const request = store.put({
//           id: id,
//           data: jsonData,
//           timestamp: new Date().getTime(),
//         })

//         // 设置事务超时
//         const timeoutId = setTimeout(() => {
//           transaction.abort()
//         }, 50000)
//         request.onsuccess = () => {
//           resolve(1)
//           clearTimeout(timeoutId)
//         }
//         request.onerror = (event: Event) => {
//           clearTimeout(timeoutId)
//           reject((event.target as IDBRequest).error)
//         }
//       })
//     })
//   }

//   // 获取数据
//   async get(id: string): Promise<any> {
//     return this.executeOperation((db) => {
//       return new Promise((resolve, reject) => {
//         const transaction = db.transaction([this.storeName], 'readonly')
//         const store = transaction.objectStore(this.storeName)

//         const request = store.get(id)

//         request.onsuccess = (event: Event) => {
//           const result = (event.target as IDBRequest).result
//           resolve(result ? result.data : null)
//         }

//         request.onerror = (event: Event) => reject((event.target as IDBRequest).error)
//       })
//     })
//   }

//   // 删除数据
//   async delete(id: string): Promise<number> {
//     return this.executeOperation((db) => {
//       return new Promise((resolve, reject) => {
//         const transaction = db.transaction([this.storeName], 'readwrite')
//         const store = transaction.objectStore(this.storeName)

//         const request = store.delete(id)

//         request.onsuccess = () => resolve(1)
//         request.onerror = (event: Event) => reject((event.target as IDBRequest).error)
//       })
//     })
//   }

//   // 关闭数据库连接
//   async close(): Promise<void> {
//     return new Promise((resolve) => {
//       if (this.db) {
//         // console.log('Closing database connection...')
//         this.db.close()
//         this.db = null
//         this.isOpening = false
//         this.openPromise = null
//       }
//       resolve()
//     })
//   }

//   // 重新连接
//   private async reconnect() {
//     console.log('Attempting to reconnect...')
//     await this.close()
//     return this.open()
//   }

//   // 清理所有数据
//   async clearAll(): Promise<void> {
//     return this.executeOperation((db) => {
//       return new Promise((resolve, reject) => {
//         const transaction = db.transaction([this.storeName], 'readwrite')
//         const store = transaction.objectStore(this.storeName)

//         const request = store.clear()

//         request.onsuccess = () => resolve()
//         request.onerror = (event: Event) => reject((event.target as IDBRequest).error)
//       })
//     })
//   }
// }

export const registerLocale = async ({ setLayoutLoading, newLang = 'en-US', handleLang }) => {
  setLayoutLoading(10)

  // const cache = new JSONCache('AppCache', 'JSONData')
  // await cache.open()

  // const getCache = async (key: string): Promise<any> => {
  //   try {
  //     // 读取数据
  //     const data = await cache.get(key)
  //     return data || {}
  //   } catch (error) {
  //     console.error('Operation failed:', error)
  //   }
  // }
  // const setCache = async (key: string, data: any): Promise<void> => {
  //   try {
  //     // 保存数据
  //     await cache.save(key, data)
  //   } catch (error) {
  //     console.error('Operation failed:', error)
  //   }
  // }

  // const initCacheLocale = async () => {
  //   const zh_CN = await getCache('locale/zh_CN')
  //   zh_CN &&
  //     addLocale('zh-CN', zh_CN, {
  //       momentLocale: 'zh-CN',
  //       antd: zhCN,
  //     })
  //   const en_US = await getCache('locale/en_US')
  //   en_US &&
  //     addLocale('en-US', en_US, {
  //       momentLocale: 'en-US',
  //       antd: enUS,
  //     })
  //   // console.log(zh_CN, en_US)

  //   handleLang(newLang, true)
  //   setLayoutLoading(80)
  //   return
  // }

  const initLocale = async () => {
    const zh_CN = (await axios.get(`/locales/locale_zh_CN.${process.env.LOCALE_HASH}.json`))?.data || {}
    // const zh_CN = (await axios.get('/locales/locale_zh_CN.json'))?.data || {}

    addLocale('zh-CN', zh_CN, {
      momentLocale: 'zh-CN',
      antd: zhCN,
    })

    // const en_US = (await axios.get('/locales/locale_en_US.json'))?.data || {}
    const en_US = (await axios.get(`/locales/locale_en_US.${process.env.LOCALE_HASH}.json`))?.data || {}
    addLocale('en-US', en_US, {
      momentLocale: 'en-US',
      antd: enUS,
    })

    handleLang(newLang, true)
    // setCache('locale/zh_CN', zh_CN)
    // setCache('locale/en_US', en_US)
    setLayoutLoading(100)
  }
  Promise.all([
    // initCacheLocale(), 
    initLocale()]).finally(() => {

    // cache.close()
  })
}
