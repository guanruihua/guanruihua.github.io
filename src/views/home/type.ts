export interface Item {
  name: string
  label: string
  url?: string
  style?: React.CSSProperties
}

export interface Guide {
  name?: string
  next: string[][]
  [key: string]: any
}

export interface Conf {
  items: Item[]
  guide: Guide[]
}
