export interface UseIndexedDBProps {
  /**
   * @description
   */
  dbName?: string
  tableName?: string
}

export interface IndexedDBItem {
  key: string
  value: string
  info?: any
}
export interface IndexedDBAddItem {
  key?: string
  value: string
  info?: any
}