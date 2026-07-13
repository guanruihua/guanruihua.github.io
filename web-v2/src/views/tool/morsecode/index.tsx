import { useTag } from '@/components/tag/hook'
import { Data } from './data'
import './index.less'
import { Tags } from '@/components/tag'
import { Button, Input } from 'antd'
import { useState } from 'react'
import { text2Morse } from './helper'
import { Flex } from 'aurad'
import { copy } from '@/util'

const MAP = {
  '.': '．',
  '-': '━',
}
// ━
// ．
// https://morsecode.bmcx.com/
export default function Morsecode() {
  const [input, setInput] = useState('I Love you')
  const { tags, setTag, isSelectTag } = useTag([
    { value: 'textToMorse', label: 'Text To Morse' },
    { value: 'letter', label: '字母' },
    { value: 'number', label: '数字' },
    { value: 'punctuation', label: '标点符号' },
    { value: 'procedural_signals', label: '特殊字符' },
  ])
  const list = [
    {
      title: '字母',
      map: Data.letters,
      show: isSelectTag('letter'),
    },
    { title: '数字', map: Data.numbers, show: isSelectTag('number') },
    {
      title: '标点符号',
      map: Data.punctuation,
      show: isSelectTag('punctuation'),
    },
    {
      title: '特殊字符',
      map: Data.procedural_signals,
      show: isSelectTag('procedural_signals'),
    },
  ].filter((_) => _.show)

  return (
    <div className="tool__Morsecode">
      <div className="container">
        <Tags tags={tags} setTag={setTag} />

        <div
          className="text-to-morse"
          data-hidden={!isSelectTag('textToMorse')}
        >
          <Input.TextArea
            value={input}
            onChange={(e) => setInput(e.target.value || '')}
          />
          <div className="render">
            {text2Morse(input)
              .split('')
              .map((k) => MAP[k] ?? k)
              .join('')}
          </div>
          <Flex>
            <Button
              disabled={!input.length}
              onClick={() => setInput('')}
              type="primary"
            >
              Clear
            </Button>
            <Button
              disabled={!input.length}
              type="primary"
              onClick={() => copy(text2Morse(input))}
            >
              Copy
            </Button>
          </Flex>
        </div>
        {list.map((item, i) => (
          <div key={item.title} className="item" data-index={i}>
            <h2 className="title">{item.title}</h2>
            <div className="map">
              {Object.keys(item.map).map((key) => (
                <div className="map-item" key={key}>
                  <div className="key">{key}</div>
                  <div className="value">
                    {item.map[key]
                      .split('')
                      .map((k) => MAP[k])
                      .join('')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
