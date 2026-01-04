import { isString } from 'asura-eye'

export const getArgs = (target: any, defaultValue = {}) => {
  try {
    if (isString(target)) {
      const result = JSON.parse(target.trim()) ?? defaultValue
      if (isString(result?.data)) {
        result.data = JSON.parse(result.data)
      }
      return result
    }
    return defaultValue
  } catch (error) {
    console.error(error, '/', target)
    return defaultValue
  }
}

export const isDrawChartTool = (target: any) =>
  isString(target) ? target.indexOf('draw_chart') === 0 : false
