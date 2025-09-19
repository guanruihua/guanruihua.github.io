function htmlToReactEnhanced(htmlString, options = {}) {
  const defaultOptions = {
    componentName: 'Component',
    useJSX: true,
    includeImports: true,
    indentSize: 2,
    ...options,
  }

  // 自闭合标签列表
  const selfClosingTags = [
    'img',
    'input',
    'br',
    'hr',
    'meta',
    'link',
    'area',
    'base',
    'col',
    'command',
    'embed',
    'keygen',
    'param',
    'source',
    'track',
    'wbr',
  ]

  // 转换属性名
  const convertAttributeName = (name) => {
    const mapping = {
      class: 'className',
      for: 'htmlFor',
      tabindex: 'tabIndex',
      maxlength: 'maxLength',
      cellspacing: 'cellSpacing',
      cellpadding: 'cellPadding',
      contenteditable: 'contentEditable',
      autocomplete: 'autoComplete',
      autofocus: 'autoFocus',
    }

    return mapping[name.toLowerCase()] || name
  }

  // 转换属性值
  const convertAttributeValue = (name, value) => {
    // 处理布尔属性
    if (value === null || value === '') return true

    // 处理样式
    if (name.toLowerCase() === 'style') {
      const styleObj = {}
      value.split(';').forEach((declaration) => {
        const [prop, val] = declaration.split(':').map((s) => s.trim())
        if (prop && val) {
          const reactProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
          styleObj[reactProp] = val
        }
      })
      return styleObj
    }

    // 处理事件
    if (name.startsWith('on') && name.length > 2) {
      return `{${value}}`
    }

    return value
  }

  // 解析属性
  const parseAttributes = (attrString) => {
    const attributes = {}
    const attrRegex = /([^\s=]+)(?:="([^"]*)")?|([^\s=]+)(?:\s|$)/g
    let match

    while ((match = attrRegex.exec(attrString)) !== null) {
      const name = match[1] || match[3]
      const value = match[2] || ''

      if (name) {
        const reactName = convertAttributeName(name)
        attributes[reactName] = convertAttributeValue(name, value)
      }
    }

    return attributes
  }

  // 解析 HTML
  const parseHTML = (html) => {
    const stack = []
    const root = { type: 'root', children: [] }
    stack.push(root)

    const elementRegex = /<(\/?)([a-z][a-z0-9]*)([^>]*)>|([^<]+)/gi
    let lastIndex = 0
    let match

    while ((match = elementRegex.exec(html)) !== null) {
      const [fullMatch, isClosing, tagName, attrs, text] = match

      // 处理文本节点
      if (text) {
        const trimmed = text.trim()
        if (trimmed) {
          stack[stack.length - 1].children.push({
            type: 'text',
            content: trimmed,
          })
        }
      }
      // 处理闭合标签
      else if (isClosing) {
        if (stack.length > 1) {
          stack.pop()
        }
      }
      // 处理开始标签
      else {
        const element = {
          type: 'element',
          tagName,
          attributes: parseAttributes(attrs),
          children: [],
        }

        stack[stack.length - 1].children.push(element)

        // 如果不是自闭合标签，压入栈
        if (!selfClosingTags.includes(tagName.toLowerCase())) {
          stack.push(element)
        }
      }

      lastIndex = elementRegex.lastIndex
    }

    return root.children
  }

  // 生成 React 代码
  const generateReactCode = (nodes, indent = 0) => {
    let code = ''
    const indentStr = ' '.repeat(indent * defaultOptions.indentSize)

    for (const node of nodes) {
      if (node.type === 'text') {
        // 文本节点
        code += `${indentStr}${JSON.stringify(node.content)},\n`
      } else if (node.type === 'element') {
        // 元素节点
        const { tagName, attributes, children } = node

        // 处理属性
        const props = Object.entries(attributes)
          .map(([key, value]) => {
            if (value === true) return key
            if (typeof value === 'string')
              return `${key}=${JSON.stringify(value)}`
            if (key === 'style' && typeof value === 'object') {
              return `${key}={${JSON.stringify(value)}}`
            }
            return `${key}={${JSON.stringify(value)}}`
          })
          .join(' ')

        // 生成标签
        if (selfClosingTags.includes(tagName.toLowerCase())) {
          code += `${indentStr}<${tagName} ${props} />,\n`
        } else {
          code += `${indentStr}<${tagName} ${props}>\n`
          code += generateReactCode(children, indent + 1)
          code += `${indentStr}</${tagName}>,\n`
        }
      }
    }

    return code
  }

  // 生成完整组件代码
  const parsed = parseHTML(htmlString)
  let reactCode = generateReactCode(parsed)

  // 移除最后一个逗号
  reactCode = reactCode.replace(/,\s*$/, '')

  let result = ''

  if (defaultOptions.includeImports) {
    result += "import React from 'react';\n\n"
  }

  result += `const ${defaultOptions.componentName} = () => (\n${reactCode}\n);\n\n`
  result += `export default ${defaultOptions.componentName};`

  return result
}

// 示例使用
const html = `
<div className="container" style="color: red; background-color: blue;">
  <h1 id="title" onClick="handleClick">Hello World</h1>
  <p>This is a paragraph with <strong>bold text</strong>.</p>
  <input type="text" placeholder="Enter your name" />
</div>
`

console.log(htmlToReactEnhanced(html, { componentName: 'MyComponent' }))
