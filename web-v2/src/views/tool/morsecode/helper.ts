import { MORSE_MAP } from './data'

/**
 * 将文本转换为摩斯密码
 * @param {string} text - 要转换的文本（英文、数字、标点）
 * @param {Object} options - 可选配置
 * @param {string} options.wordSeparator - 单词之间的分隔符，默认 '/'（斜杠前后各有一个空格）
 * @param {string} options.charSeparator - 字符之间的分隔符，默认 ' '（单个空格）
 * @param {string} options.unknown - 遇到未知字符时输出的内容，默认 '?'（设为 null 或空字符串可跳过）
 * @returns {string} 摩斯密码字符串
 */
export function text2Morse(text: string, options: any = {}) {
  const { wordSeparator = ' / ', charSeparator = ' ', unknown = '?' } = options

  if (!text || typeof text !== 'string') {
    return ''
  }

  // 按空白字符分割为单词数组（忽略连续空格）
  const words = text.trim().split(/\s+/)

  // 将每个单词转换为摩斯码（字符间用 charSeparator 连接）
  const morseWords = words.map((word) => {
    const chars = word.split('')
    const morseChars = chars.map((char) => {
      const upperChar = char.toUpperCase() // 大小写不敏感
      if (MORSE_MAP?.[upperChar]) {
        return MORSE_MAP[upperChar]
      }
      // 未知字符处理
      return unknown !== null && unknown !== undefined ? unknown : ''
    })
    // 过滤掉空字符（当 unknown 为 '' 时）
    const filtered = morseChars.filter((code) => code !== '')
    return filtered.join(charSeparator)
  })

  // 用 wordSeparator 连接所有单词
  return morseWords.join(wordSeparator)
}
