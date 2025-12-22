import { useSetState } from '0hook'
import { Box, Grid, TextArea } from 'aurad'
import React from 'react'
import { md5 } from 'harpe'

export default function () {
  const [state, setState] = useSetState(
    {
      text: '',
    },
    'tool__md5__cache',
  )
  const list = [
    ['16位小写', '16-bit-small'],
    ['16位大写', '16-bit-large'],
    ['32位小写', '32-bit-small'],
    ['32位大写', '32-bit-large'],
  ]
  return (
    <div className="tool__md5">
      <Grid>
        <TextArea
          style={{ background: '#000' }}
          value={state.text || ''}
          onChange={(e: any) => {
            setState({
              text: e.target.value || '',
            })
          }}
        />
        {state.text && (
          <React.Fragment>
            {list.map((item: string[]) => {
              const [title, type] = item
              return (
                <React.Fragment key={type}>
                  <h4>{title}</h4>
                  <Box>{md5(state.text || '', type as any)}</Box>
                </React.Fragment>
              )
            })}
          </React.Fragment>
        )}
      </Grid>
    </div>
  )
}
