import React from 'react'
import { Div, Input } from 'aurad'

export const Title = ({
  value,
  cb,
}: {
  value: string
  cb: (v: string) => void
}) => {
  const [val, setVal] = React.useState(value)
  const [status, setStatus] = React.useState('idle')

  return (
    <div
      className="title"
      onDoubleClick={() => {
        setStatus('edit')
      }}
    >
      <Div title="title-val" none={status === 'edit'}>
        {value}
      </Div>
      {status === 'edit' && (
        <Input
          value={val}
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
