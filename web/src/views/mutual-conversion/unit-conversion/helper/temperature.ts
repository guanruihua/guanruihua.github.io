// 以摄氏度为基准的转换公式
export class TemperatureConverter {
  // 摄氏度转其他单位
  static celsiusTo(targetUnit: string, celsius: number) {
    switch (targetUnit) {
      case '℃':
        return celsius
      case '℉':
        return (celsius * 9) / 5 + 32
      case 'K':
        return celsius + 273.15
      case 'Re':
        return (celsius * 4) / 5
      case '°R':
        return (celsius * 9) / 5 + 491.67
      default:
        throw new Error('不支持的温标')
    }
  }

  // 其他单位转摄氏度
  static toCelsius(fromUnit: string, value: number) {
    switch (fromUnit) {
      case '℃':
        return value
      case '℉':
        return ((value - 32) * 5) / 9
      case 'K':
        return value - 273.15
      case '°Re':
        return (value * 5) / 4
      case '°R':
        return ((value - 491.67) * 5) / 9
      default:
        throw new Error('不支持的温标')
    }
  }

  // 任意两个单位间的转换
  static convert(value: number, fromUnit: string, toUnit: string) {
    try {
      const celsius = this.toCelsius(fromUnit, value)
      return this.celsiusTo(toUnit, celsius)
    } catch (error) {
      return ''
    }
  }
}
