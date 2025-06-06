import { ObjectType } from '0type'

export interface Conf {
  id?: string
  title?: string
  desc?: string
  frequency?: string
  type?: string
  timeFrequency?: string
}

export interface State {
  todo: Conf[]
}
