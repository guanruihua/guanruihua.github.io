import { State } from '../store'
import { html2react } from './html/html2react'
import { json2XML } from './json/toXML'
import xml2json from './xml/toJSON'
import * as prettier from 'prettier'
import parserHtml from 'prettier/plugins/html'

export async function get_to_value(lang: string, state: State) {
  const value = state.from_value
  if (!value) return ''
  try {
    switch (lang) {
      case 'json2XML':
        return json2XML(value)
      case 'xml2json':
        return xml2json(value)
      case 'html2react':
        return html2react(value)
      case 'json_compress':
        return JSON.stringify(JSON.parse(value))
      case 'prettier_format_xml': {
        return await prettier.format(value, {
          parser: 'html', // XML 使用 html 解析器
          plugins: [parserHtml],
          tabWidth: 2,
          useTabs: false,
        })
      }
    }
  } catch {
    return ''
  }
  return ''
}
