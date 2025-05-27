import React from 'react'
import './index.less'
import { classNames } from 'harpe'

export function Quotes() {
  const options = ['none', 'initial', `"'" "'"`, `"《" "》" "<" ">"`]
  const [select, setSelect] = React.useState(options.at(-1))

  return (
    <div className="study-page-q-quotes md">
      <div className="left">
        {options.map((value) => (
          <div
            key={value}
            className={classNames('option', {
              select: select === value,
            })}
            onClick={() => setSelect(value)}
          >
            {`quotes:  ${value};`}
          </div>
        ))}
      </div>
      <div className="right">
        <q id="example-element" style={{ quotes: select }}>
          Show us the wonder-working <q>Brothers,</q> let them come out
          publicly—and we will believe in them!
        </q>
      </div>
    </div>
  )
}
