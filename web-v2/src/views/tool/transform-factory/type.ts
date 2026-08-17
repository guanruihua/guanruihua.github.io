import { ButtonProps } from 'antd'
import { State } from './store'
export { State }

export type ButtonConf = [
  string,
  string,
  Partial<
    ButtonProps & {
      selectHighlight: boolean
    }
  >?,
]
