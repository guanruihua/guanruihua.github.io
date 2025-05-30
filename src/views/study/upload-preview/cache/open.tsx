/**
 * @description 打开数据库
 * @param {string} dbName 数据库的名字
 * @param {string} tableName 仓库名称
 * @param {string} version 数据库的版本
 * @return {IDBFactory} 该函数会返回一个数据库实例
 */
export function openDB(
  dbName: string,
  tableName: string,
  version = 1,
): Promise<IDBOpenDBRequest | null> {
  return new Promise((resolve) => {
    // resolve(null)
    //  兼容浏览器
    const indexedDB: IDBFactory =
      window.indexedDB ||
      (window as any).mozIndexedDB ||
      (window as any).webkitIndexedDB ||
      (window as any).msIndexedDB
    let db
    // 打开数据库，若没有则会创建
    const request = indexedDB.open(dbName, version)
    // 数据库打开成功回调
    request.onsuccess = function (event: any) {
      db = event.target.result // 数据库对象
      // console.log('数据库打开成功')
      resolve(db)
    }
    // 数据库打开失败的回调
    request.onerror = function (event: any) {
      console.log('数据库打开失败')
    }
    // 数据库有更新时候的回调
    request.onupgradeneeded = function (event: any) {
      // 数据库创建或升级的时候会触发
      // console.log('onupgradeneeded')
      db = event.target.result // 数据库对象
      var objectStore
      // 创建存储库
      objectStore = db.createObjectStore(tableName, {
        keyPath: 'key', // 这是主键
        // autoIncrement: true // 实现自增
      })
      // 创建索引，在后面查询数据的时候可以根据索引查
      objectStore.createIndex('key', 'key', { unique: true })
      objectStore.createIndex('value', 'value', { unique: false })
      objectStore.createIndex('name', 'name', { unique: false })
      objectStore.createIndex('sort', 'sort', { unique: false })
      objectStore.createIndex('info', 'info', { unique: false })
    }
  })
}
