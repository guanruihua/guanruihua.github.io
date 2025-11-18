import { ObjectType } from '../type'

export interface Args {
  lang?: string
  title?: string
  data?: ObjectType[]
  xData?: (string | number)[]
  yData?: (string | number)[]
}
