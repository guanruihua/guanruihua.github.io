export class UnicodeConverter {
  // 中文转Unicode（多种格式）
  static toUnicode(text: string, format = 'escaped') {
    switch (format) {
      case 'escaped': // \uXXXX
        return this.toEscapedUnicode(text)
      case 'codePoints': // U+XXXX
        return this.toCodePoints(text)
      case 'decimal': // 十进制
        return this.toDecimalCodes(text)
      case 'hex': // 十六进制
        return this.toHexCodes(text)
      default:
        return this.toEscapedUnicode(text)
    }
  }

  // 转义Unicode格式：\u4F60\u597D
  static toEscapedUnicode(text: string) {
    return Array.from(text)
      .map((char) => {
        const codePoint = char.codePointAt(0)
        if(!codePoint) return undefined
        if (codePoint > 0xffff) {
          return `\\u{${codePoint.toString(16).toUpperCase()}}`
        }
        return `\\u${codePoint.toString(16).toUpperCase().padStart(4, '0')}`
      })
      .join('')
  }

  // U+格式：U+4F60 U+597D
  static toCodePoints(text: string) {
    return Array.from(text)
      .map((char) => {
        return `U+${(char.codePointAt(0) || '').toString(16).toUpperCase()}`
      })
      .join(' ')
  }

  // 十进制编码
  static toDecimalCodes(text: string) {
    return Array.from(text)
      .map((char) => {
        return char.codePointAt(0)?.toString()
      })
      .join(' ')
  }

  // 十六进制编码（无前缀）
  static toHexCodes(text: string) {
    return Array.from(text)
      .map((char) => {
        return char.codePointAt(0)?.toString(16).toUpperCase()
      })
      .join(' ')
  }

  // Unicode转中文
  static toChinese(unicodeText: string, format = 'auto') {
    // 自动检测格式
    if (format === 'auto') {
      if (unicodeText.includes('\\u{') || unicodeText.includes('\\u')) {
        return this.fromEscapedUnicode(unicodeText)
      } else if (unicodeText.includes('U+')) {
        return this.fromCodePoints(unicodeText)
      } else if (/^[0-9A-Fa-f\s]+$/.test(unicodeText)) {
        return this.fromHexCodes(unicodeText)
      } else {
        return this.fromDecimalCodes(unicodeText)
      }
    }

    switch (format) {
      case 'escaped':
        return this.fromEscapedUnicode(unicodeText)
      case 'codePoints':
        return this.fromCodePoints(unicodeText)
      case 'decimal':
        return this.fromDecimalCodes(unicodeText)
      case 'hex':
        return this.fromHexCodes(unicodeText)
      default:
        return this.fromEscapedUnicode(unicodeText)
    }
  }

  // 从转义格式解析
  static fromEscapedUnicode(text: string) {
    // 处理 \u{XXXXX} 格式
    text = text.replace(/\\u\{([0-9A-F]+)\}/gi, (match, code) => {
      return String.fromCodePoint(parseInt(code, 16))
    })

    // 处理 \uXXXX 格式
    return text.replace(/\\u[\dA-F]{4}/gi, (match) => {
      return String.fromCharCode(parseInt(match.slice(2), 16))
    })
  }

  // 从U+格式解析
  static fromCodePoints(text: string) {
    return text.replace(/U\+([0-9A-F]+)/gi, (match, code) => {
      const codePoint = parseInt(code, 16)
      return String.fromCodePoint(codePoint)
    })
  }

  // 从十六进制解析
  static fromHexCodes(text: string) {
    return text
      .split(/\s+/)
      .map((hex) => {
        if (hex.trim()) {
          return String.fromCodePoint(parseInt(hex, 16))
        }
        return ''
      })
      .join('')
  }

  // 从十进制解析
  static fromDecimalCodes(text: string) {
    return text
      .split(/\s+/)
      .map((decimal) => {
        if (decimal.trim()) {
          return String.fromCodePoint(parseInt(decimal))
        }
        return ''
      })
      .join('')
  }

  // 获取字符的Unicode信息
  static getCharInfo(char: string) {
    const codePoint = char.codePointAt(0) || 0
    return {
      character: char,
      codePoint: codePoint,
      unicode: `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`,
      escaped: `\\u${codePoint.toString(16).toUpperCase().padStart(4, '0')}`,
      decimal: codePoint.toString(),
      hex: codePoint.toString(16).toUpperCase(),
      utf16: this.getUTF16Encoding(char),
      category: this.getUnicodeCategory(codePoint),
      isChinese: this.isChineseCharacter(char),
    }
  }

  // 获取UTF-16编码
  static getUTF16Encoding(char: string) {
    const codePoint = char.codePointAt(0) || 0
    if (codePoint <= 0xffff) {
      return [codePoint.toString(16).toUpperCase()]
    } else {
      // 代理对
      const highSurrogate = Math.floor((codePoint - 0x10000) / 0x400) + 0xd800
      const lowSurrogate = ((codePoint - 0x10000) % 0x400) + 0xdc00
      return [highSurrogate.toString(16), lowSurrogate.toString(16)].map((s) =>
        s.toUpperCase(),
      )
    }
  }

  // 判断是否为中文字符
  static isChineseCharacter(char: string) {
    const codePoint = char.codePointAt(0)
    if (!codePoint) return undefined
    return (
      (codePoint >= 0x4e00 && codePoint <= 0x9fff) || // 基本汉字
      (codePoint >= 0x3400 && codePoint <= 0x4dbf) || // 扩展A区
      (codePoint >= 0x20000 && codePoint <= 0x2a6df) || // 扩展B区
      (codePoint >= 0x2a700 && codePoint <= 0x2b73f) || // 扩展C区
      (codePoint >= 0x2b740 && codePoint <= 0x2b81f) || // 扩展D区
      (codePoint >= 0x2b820 && codePoint <= 0x2ceaf) || // 扩展E区
      (codePoint >= 0x2ceb0 && codePoint <= 0x2ebef) || // 扩展F区
      (codePoint >= 0x30000 && codePoint <= 0x3134f) || // 扩展G区
      (codePoint >= 0x31350 && codePoint <= 0x323af)
    ) // 扩展H区
  }

  // 获取Unicode分类
  static getUnicodeCategory(codePoint: number) {
    if (codePoint >= 0x4e00 && codePoint <= 0x9fff) return '基本汉字'
    if (codePoint >= 0x3400 && codePoint <= 0x4dbf) return '扩展A区汉字'
    if (codePoint >= 0x20000 && codePoint <= 0x2a6df) return '扩展B区汉字'
    if (codePoint >= 0x2a700 && codePoint <= 0x2b73f) return '扩展C区汉字'
    if (codePoint >= 0x2b740 && codePoint <= 0x2b81f) return '扩展D区汉字'
    if (codePoint >= 0x2b820 && codePoint <= 0x2ceaf) return '扩展E区汉字'
    if (codePoint >= 0x2ceb0 && codePoint <= 0x2ebef) return '扩展F区汉字'
    if (codePoint >= 0x30000 && codePoint <= 0x3134f) return '扩展G区汉字'
    if (codePoint >= 0x31350 && codePoint <= 0x323af) return '扩展H区汉字'
    if (codePoint >= 0x3000 && codePoint <= 0x303f) return 'CJK标点符号'
    if (codePoint >= 0xff00 && codePoint <= 0xffef) return '全角字符'
    return '其他字符'
  }
}

// 测试各种转换
// const testText = "你好，世界！Hello, 世界！";
// const testText = '辛弃疾《青玉案·元夕》东风夜放花千树，更吹落、星如雨。宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。 蛾儿雪柳黄金缕，笑语盈盈暗香去。众里寻他千百度。蓦然回首，那人却在，灯火阑珊处。'

// console.log('=== Unicode转换演示 ===')

// 各种格式转换
// console.log('原始文本:', testText)
// console.log('转义Unicode:', UnicodeConverter.toUnicode(testText, 'escaped'))
// console.log('U+格式:', UnicodeConverter.toUnicode(testText, 'codePoints'))
// console.log('十六进制:', UnicodeConverter.toUnicode(testText, 'hex'))
// console.log('十进制:', UnicodeConverter.toUnicode(testText, 'decimal'))

// 转换回中文
// const unicodeText = '\\u4F60\\u597D\\uFF0C\\u4E16\\u754C\\uFF01Hello\\u002C\\u0020\\u4E16\\u754C\\uFF01'
// console.log('转回中文:', UnicodeConverter.toChinese(unicodeText))

// 字符信息查询
// console.log("\n=== 字符信息 ===");
// ['你', '好', '世', '界', '𠮷'].forEach(char => {
//     console.log(`${char}:`, UnicodeConverter.getCharInfo(char));
// });