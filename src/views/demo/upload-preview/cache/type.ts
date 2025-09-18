export interface UseIndexedDBProps {
  /**
   * @description
   */
  dbName?: string
  tableName?: string
  callback?: {
    afterInitSuccess?(req: IDBOpenDBRequest): void
  }
  [key: string]: any
}

export interface IndexedDBItem {
  key: string
  value: string
  sort?: number
  name?: string
  info?: any
}
export interface IndexedDBAddItem {
  key?: string
  value: string
  sort?: number
  name?: string
  info?: any
}
