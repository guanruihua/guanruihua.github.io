export interface StockPrice {
  date: Date
  value: number
}
export type Status = 'error' | 'loading' | 'ok'
export type IconProps = {
  icon: string
  color?: string
  size?: string
}
export type StockWidgetProps = {
  symbol: string
  name?: string
}
export type StockWidgetErrorProps = {
  symbol: string
}
export type StockWidgetGraphProps = {
  data: number[]
}