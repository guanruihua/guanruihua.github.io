import React from 'react'
import { useSetState } from '0hook'
import { Box, Grid, TextArea } from 'aurad'

export default function () {
  const [state, setState] = useSetState(
    {
      text: '<script>alert("xss")</script>',
    },
    'tool__HTML escape__cache',
  )

  function escapeHtml(text: string) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  return (
    <div className="tool__HTML escape">
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
        <Box>{escapeHtml(state.text || '')}</Box>
      </Grid>
    </div>
  )
}
