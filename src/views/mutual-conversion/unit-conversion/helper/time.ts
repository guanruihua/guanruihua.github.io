import { ObjectType } from 'abandonjs'
import * as math from 'mathjs'

const timeConversionFactors: ObjectType<number> = {
  ms: 0.001, // 毫秒转秒
  s: 1, // 秒j
  min: 60, // 分钟
  h: 3600, // 小时
  d: 86400, // 天（24小时）
  week: 604800, // 周（7天）
  // month: 2592000, // 月（近似30天）
  // year: 31536000, // 年（365天）
  month: 2629800, // 平均月（365.25/12天）
  year: 31557600, // 平均年（365.25天）
}

export class TimeConverter {
  // 任意两个单位间的转换
  static convert(
    value: string,
    fromOption: ObjectType<string>,
    toOption: ObjectType<string>,
  ) {
    const ft = timeConversionFactors[fromOption.value]
    const tt = timeConversionFactors[toOption.value]

    const getFormula = () => {
      return `${ft} * ${value} / ${tt}`
    }
    try {
      return math.evaluate(getFormula()).valueOf() || ''
    } catch (error) {
      return ''
    }
  }
}
