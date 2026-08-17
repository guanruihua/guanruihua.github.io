import { XMLParser } from 'fast-xml-parser'

// xml2js
export default function xml2json(xmlString: string) {
  const parser = new XMLParser({
    ignoreAttributes: false, // 保留属性
    attributeNamePrefix: '', // 属性前缀
    textNodeName: '#text', // 文本节点键名
    parseTagValue: true, // 自动转换数字/布尔
    trimValues: true,
  })
  const jsonObj = parser.parse(xmlString)
  return JSON.stringify(jsonObj, null, 2)
}
