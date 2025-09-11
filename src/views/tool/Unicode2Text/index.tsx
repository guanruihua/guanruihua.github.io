import { useSetState } from '0hook'
import { Button, Flex, TextArea } from 'aurad'
import React from 'react'

export default function () {
  const [state, setState] = useSetState(
    {
      // 'toText' | 'toUnicode
      type: 'toText',
      text: '',
    },
    'tool__Unicode2Chinese__cache',
  )
  function unicodeToText(unicodeStr: string = '') {
    return unicodeStr.replace(/\\u[\dA-Fa-f]{4}/g, (match) =>
      String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16)),
    )
  }

  function textToUnicode(text: string = '') {
    return text
      .split('')
      .map((char) => {
        // 获取字符的 Unicode 码点（十进制）
        const codePoint = char.charCodeAt(0)
        // 转换为 16 进制，并补零（4位）
        return '\\u' + codePoint.toString(16).padStart(4, '0')
      })
      .join('')
  }

  return (
    <div className="tool__Unicode2Chinese">
      <Flex column>
        <Flex>
          <Button
            type={state.type === 'toUnicode' ? 'primary' : 'default'}
            onClick={() => setState({ type: 'toUnicode' })}
          >
            Text to Unicode
          </Button>
          <Button
            type={state.type === 'toText' ? 'primary' : 'default'}
            onClick={() => setState({ type: 'toText' })}
          >
            Unicode to Text
          </Button>
        </Flex>
        <div style={{ width: '100%' }}>
          <TextArea
            value={state.text}
            style={{ background: 'transparent', width: '100%' }}
            onChange={(e: any) => {
              setState({ text: e.target.value || '' })
            }}
          />
        </div>
        <pre>
          {state.type === 'toText'
            ? unicodeToText(state.text)
            : textToUnicode(state.text)}
        </pre>
      </Flex>
    </div>
  )
}
