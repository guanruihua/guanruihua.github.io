import React from 'react'
import { Conf } from './conf'
import { Md } from '@/components'
import './index.less'

export default function BrowserNative() {
  const [select, setSelect] = React.useState(Conf.at(0)?.title || '')
  const { title, md } = Conf.find((_) => _.title === select)
  return (
    <div className="browser-native">
      <div className="left">
        {Conf.map((item, i) => {
          const { title } = item
          return (
            <div
              className="module"
              key={title}
              data-select={select === title}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setSelect(title)
              }}
            >
              {i + 1}. {title}
            </div>
          )
        })}
      </div>
      <div className="right">
        <div className="item" key={title}>
          <div className="title">{title}</div>
          <div className="md">
            <Md value={md} />
          </div>
        </div>
      </div>
    </div>
  )
}
