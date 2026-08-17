/**
 * 将 HTML 字符串转换为 React JSX 字符串（浏览器端）
 * @param {string} html - 输入的 HTML 字符串
 * @returns {string} - 对应的 JSX 代码字符串
 */
export function html2react(html) {
  // 1. 使用 DOMParser 解析 HTML
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const body = doc.body
  const childNodes = Array.from(body.childNodes)

  if (childNodes.length === 0) return ''

  // 2. 转换每个节点
  const jsxNodes = childNodes.map((node) => convertNode(node)).filter(Boolean)

  // 3. 如果只有一个根节点，直接返回；否则用 Fragment 包裹
  if (jsxNodes.length === 1) {
    return jsxNodes[0]
  } else {
    return `<React.Fragment>${jsxNodes.join('')}</React.Fragment>`
  }
}

/**
 * 转换单个 DOM 节点
 */
function convertNode(node) {
  // 文本节点
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent
    // 保留空白字符，但需转义 HTML 敏感字符
    return escapeText(text)
  }

  // 元素节点
  if (node.nodeType === Node.ELEMENT_NODE) {
    const tagName = node.tagName.toLowerCase()
    const attrs = convertAttrs(node.attributes)
    const children = Array.from(node.childNodes)
      .map((child) => convertNode(child))
      .join('')

    // 自闭合标签列表（React 中必须自闭合）
    const selfClosingTags = [
      'area',
      'base',
      'br',
      'col',
      'embed',
      'hr',
      'img',
      'input',
      'link',
      'meta',
      'param',
      'source',
      'track',
      'wbr',
    ]

    if (selfClosingTags.includes(tagName)) {
      return `<${tagName}${attrs} />`
    } else {
      return `<${tagName}${attrs}>${children}</${tagName}>`
    }
  }

  // 其他类型（注释等）忽略
  return ''
}

/**
 * 转换属性列表为 JSX 属性字符串
 */
function convertAttrs(attrs) {
  // 属性名映射 (HTML → React)
  const attrMap = {
    class: 'className',
    for: 'htmlFor',
    // 可自行添加更多（如 tabindex → tabIndex）
  }

  let result = ''

  for (const attr of attrs) {
    let name = attr.name
    const value = attr.value

    // 处理 style 属性：转为 style={{ ... }} 对象
    if (name === 'style') {
      const styleObj = parseStyle(value)
      const styleStr = objectToStyleString(styleObj)
      result += ` style={{${styleStr}}}`
      continue
    }

    // 属性名映射
    if (attrMap[name]) {
      name = attrMap[name]
    }

    // 布尔属性（如 disabled, checked）→ 省略值即为 true
    if (value === '' || value === name) {
      result += ` ${name}`
    } else {
      // 转义属性值中的双引号
      const escaped = value.replace(/"/g, '&quot;')
      result += ` ${name}="${escaped}"`
    }
  }

  return result
}

/**
 * 解析 style 字符串为对象（kebab → camelCase）
 */
function parseStyle(styleStr) {
  const obj = {}
  const declarations = styleStr.split(';').filter((s) => s.trim() !== '')
  for (const decl of declarations) {
    const [prop, val] = decl.split(':').map((s) => s.trim())
    if (prop && val) {
      // 转驼峰
      const camelProp = prop.replace(/-([a-z])/g, (_, char) =>
        char.toUpperCase(),
      )
      obj[camelProp] = val
    }
  }
  return obj
}

/**
 * 将样式对象转换为 JSX 内联对象字符串
 * 例如：{ color: 'red', fontSize: '12px' }
 */
function objectToStyleString(obj) {
  return Object.entries(obj)
    .map(([key, val]) => `${key}: '${val}'`)
    .join(', ')
}

/**
 * 转义文本节点中的敏感字符（防止 XSS 显示问题）
 */
function escapeText(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
