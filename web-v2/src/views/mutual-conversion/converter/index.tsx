import React from 'react'
import { Converter } from 'opencc-js'
import { useSetState } from '0hook'
import { Button } from 'aurad'
import { copy } from '@/util'
import './index.less'

export default function ConverterChinese() {
  const [state, setState] = useSetState<any>(
    {
      text: '',
      direction: { from: 'cn', to: 'tw' },
      convertedText: '',
    },
    'mutual-conversion__converter-Chinese-cache',
  )

  const handleConvert = (direction = state.direction, text = state.text) => {
    const converter = Converter(direction)
    setState({
      text,
      direction,
      convertedText: converter(text),
    })
  }

  return (
    <div className="mutual-conversion__converter-Chinese">
      <textarea
        value={state.text}
        onChange={(e: any) => {
          if (e?.nativeEvent?.inputType === 'insertLineBreak') {
            handleConvert(state.direction, e.target.value)
            return
          }
          setState({ text: e.target.value })
        }}
      />
      <div className="mutual-conversion__converter-Chinese-center">
        <Button
          type="primary"
          onClick={() => handleConvert({ from: 'cn', to: 'tw' })}
        >
          简转繁
        </Button>
        <Button
          type="primary"
          onClick={() => handleConvert({ from: 'tw', to: 'cn' })}
        >
          繁转简
        </Button>
        <Button
          type="primary"
          disabled={!state?.text}
          onClick={() => setState({ text: '', convertedText: '' })}
        >
          清空
        </Button>
        <Button
          disabled={!state?.convertedText}
          type="primary"
          onClick={() => copy(state.convertedText)}
        >
          复制结果
        </Button>
      </div>
      <pre className="mutual-conversion__converter-Chinese-right">{state.convertedText}</pre>
    </div>
  )
}
