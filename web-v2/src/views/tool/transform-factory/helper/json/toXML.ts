import { isString } from 'asura-eye'

/**
 * @deprecated 有问题
 * @param obj 
 * @param rootName 
 * @returns 
 */
export function json2XML(obj, rootName = 'root') {
  if (isString(obj)) {
    try {
      return json2XML(JSON.parse(obj), rootName)
    } catch {
      //
    }
  }
  if (typeof obj !== 'object' || obj === null) {
    return String(obj)
  }
  // 处理数组
  if (Array.isArray(obj)) {
    return obj.map((item) => json2XML(item, 'item')).join('')
  }

  let xml = ''
  // 处理对象
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const value = obj[key]
      if (
        Array.isArray(value) ||
        (typeof value === 'object' && value !== null)
      ) {
        xml += `<${key}>${json2XML(value, key)}</${key}>`
      } else {
        // 转义特殊字符防止 XSS（& < > " '）
        const escaped = String(value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
        xml += `<${key}>${escaped}</${key}>`
      }
    }
  }

  // 如果是根节点，包裹一层
  return rootName ? `<${rootName}>${xml}</${rootName}>` : xml
}

// 使用示例
// const json = { name: 'Alice', age: 30, hobbies: ['read', 'code'] };
// console.log(jsonToXml(json, 'person'));
// 输出: <person><name>Alice</name><age>30</age><hobbies><item>read</item><item>code</item></hobbies></person>
