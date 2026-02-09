import { ObjectType } from '0type'

export interface State {
  search?: string
  selects?: string[]
  lastVisitHistory?: ObjectType<number[]>
  historyList?: [string, string][]
  showKeyBoard?: boolean
}

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
