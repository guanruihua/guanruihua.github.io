export const Logger = {
  error(module: string, info?: string) {
    console.log(
      `%c[Error] %c[${module}]${info ? `%c${info}` : ''}`,
      'color: #f75853; font-weight: bold;',
      'color: #fff; ;font-weight: bold;',
    )
  },
  success(module: string, info?: string) {
    console.log(
      `%c[Success] %c[${module}]${info ? `%c${info}` : ''}`,
      'color: #39b062; font-weight: bold;',
      'color: #fff; ;font-weight: bold;',
    )
  },
  warning(module: string, info?: string) {
    console.log(
      `%c[Warning] %c[${module}]${info ? `%c${info}` : ''}`,
      'color: #f7ac39; font-weight: bold;',
      'color: #fff; ;font-weight: bold;',
    )
  },
  info(module: string, info?: string) {
    console.log(
      `%c[Info] %c[${module}]${info ? `%c${info}` : ''}`,
      'color: #9cdce9; font-weight: bold;',
      'color: #fff; ;font-weight: bold;',
    )
  },
  log(...info) {
    console.log(...info)
  },
}
