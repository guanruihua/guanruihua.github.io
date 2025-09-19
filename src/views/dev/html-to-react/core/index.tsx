import { convertStyleToReact } from './convertStyleToReact'
import { convertFnToReact, needConvertFnToReact } from './convertFnToReact'
import { convertClosingTags } from './convertClosingTags'
import { convertAttr } from './convertAttr'

export function htmlToReactEnhanced(htmlString: string) {
  let result = htmlString

  // 转换属性名
  result = convertAttr(result)

  // 转换 自闭合标签
  result = convertClosingTags(result)

  // 处理 style
  if (result.indexOf('style="')) {
    result = result.replace(
      /style="([^"]*)"/g,
      (match, styleStr) => `style={${convertStyleToReact(styleStr)}}`,
    )
  }

  // 处理 方法 click...
  if (needConvertFnToReact(result)) {
    result = convertFnToReact(result)
  }

  return result
}
