import React from 'react'
import { Div, Input } from 'aurad'
import { classNames, ClassNameType } from 'harpe'

export interface InputEditProps {
  className?: ClassNameType
  value: string
  cb: (v: string) => void
}

export const InputEdit = ({ className, value, cb }: InputEditProps) => {
  const ref = React.useRef<any>(null)
  const [val, setVal] = React.useState(value)
  const [status, setStatus] = React.useState('idle')
  // console.log('InputEdit: ', value, val)
  return (
    <div
      ref={ref}
      className={classNames(['input-edit', className])}
      onDoubleClick={() => {
        setStatus('edit')
        // setTimeout(() => {
        //   ref.current?.lastChild?.focus()
        //   console.log(ref.current)
        // }, 500)
      }}
    >
      <Div title="input-edit-value" none={status === 'edit'}>
        {value}
      </Div>
      {status === 'edit' && (
        <Input
          value={val}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              if (val) {
                cb(val)
              }
              setStatus('idle')
            }
          }}
          onChange={(e: any) => {
            setVal(e.target.value)
          }}
          onBlur={() => {
            if (val) {
              cb(val)
            }
            setStatus('idle')
          }}
        />
      )}
    </div>
  )
}
