import { isString } from 'asura-eye'

export const getArgs = (target: any, defaultValue = {}) => {
  try {
    const result = JSON.parse(target) ?? defaultValue
    if (isString(result?.data)) {
      result.data = JSON.parse(result.data)
    }
    return result
  } catch (error) {
    console.error(error)
    return defaultValue
  }
}
