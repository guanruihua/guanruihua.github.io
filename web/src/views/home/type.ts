export interface Item {
  name: string
  label: string
  PE?: boolean
  url?: string
  style?: React.CSSProperties
}

export interface Conf {
  items: Item[]
  guide: any[]
}
