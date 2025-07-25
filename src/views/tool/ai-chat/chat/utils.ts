export const getArgs = (target: any, defaultValue = {}) => {
  try {
    return JSON.parse(target) ?? defaultValue
  } catch (error) {
    console.error(error)
    return defaultValue
  }
}
