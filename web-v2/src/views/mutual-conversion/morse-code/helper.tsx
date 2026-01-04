import { MorseCode, ReverseMorse } from './conf'

export const string2MorseCode = (text: string = '') => {
  // console.log("🚀 ~ string2MorseCode ~ text:", text.split(''))
  return text
    .toUpperCase()
    .split('')
    .map((char) => {
      if (MorseCode?.[char]) return MorseCode[char]

      if (char === ' ') return '/'

      return char
    })
    .join(' ')
}

export const morseCode2String = (morseCode: string = '') => {
  return morseCode
    .split(' ')
    .map((code) => {
      if (code === '/') return ' '
      if (ReverseMorse?.[code]) {
        return ReverseMorse[code]
      } else {
        return code // 保持无法解码的内容
      }
    })
    .join('')
}
