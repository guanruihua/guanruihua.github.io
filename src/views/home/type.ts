export interface Item {
  name: string
  label: string
  PE?: boolean
  url?: string
  style?: React.CSSProperties
}

export interface Guide {
  name?: string
  next: string[][]
  PE?: boolean
  [key: string]: any
}

export interface Conf {
  items: Item[]
  guide: Guide[]
}
