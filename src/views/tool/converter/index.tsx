import React from 'react'
import { Converter } from 'opencc-js'
import { useSetState } from '0hook'
import './index.less'

export function ConverterChinese() {
  const [state, setState] = useSetState<any>(
    {
      text: '',
      direction: { from: 'cn', to: 'tw' },
      convertedText: '',
    },
    'tool-converter-Chinese-cache',
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
    <div className="converter-Chinese">
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
      <div className="converter-Chinese-center">
        <div onClick={() => handleConvert({ from: 'cn', to: 'tw' })}>
          简转繁
        </div>
        <div onClick={() => handleConvert({ from: 'tw', to: 'cn' })}>
          繁转简
        </div>
      </div>
      <pre className="converter-Chinese-right">{state.convertedText}</pre>
    </div>
  )
}
