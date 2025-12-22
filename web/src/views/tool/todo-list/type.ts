export interface Conf {
  id?: string
  desc?: string
  frequency?: string
  type?: string
  timeFrequency?: string
}

export interface State {
  todo: Conf[]
  
  lastUpdate: number
}
