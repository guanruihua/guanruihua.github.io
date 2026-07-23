/**
 * 从可能包含额外文本的字符串中提取 JSON 对象
 * @param {string} text - 可能包含 JSON 的原始文本
 * @returns {object|null} 解析出的 JSON 对象，失败返回 null
 */
export function text2json(text) {
  if (typeof text !== 'string') {
    // 如果已经是对象，直接返回
    if (typeof text === 'object') return text
    return null
  }

  // 1. 尝试直接解析整个字符串
  if (text.at(0) === '{')
    try {
      return JSON.parse(text)
    } catch {
      // 不是纯 JSON，继续往下
    }

  // 2. 使用正则提取第一个完整的 JSON 对象
  // 匹配以 { 开始，以 } 结束，并允许中间有嵌套括号（简单场景）
  // 注意：此正则不能处理复杂的嵌套（但有栈方案备选）
  const match = text.match(/\{[\s\S]*\}/)
  if (match) {
    try {
      return JSON.parse(match[0])
    } catch {
      // 提取出的片段仍不是合法 JSON
    }
  }

  // 3. 更强大的提取：用栈匹配最外层括号（处理嵌套）
  const startIndex = text.indexOf('{')
  if (startIndex === -1) return null

  let depth = 0
  let endIndex = -1
  for (let i = startIndex; i < text.length; i++) {
    if (text[i] === '{') depth++
    else if (text[i] === '}') {
      depth--
      if (depth === 0) {
        endIndex = i
        break
      }
    }
  }
  if (endIndex !== -1) {
    const jsonStr = text.substring(startIndex, endIndex + 1)
    try {
      return JSON.parse(jsonStr)
    } catch {
      // 仍失败
    }
  }

  return null // 无法提取
}
