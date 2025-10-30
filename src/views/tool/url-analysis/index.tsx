import { useSetState } from '0hook'
import { Button, Flex, Grid, TextArea } from 'aurad'
import React from 'react'
import { parseUrlParams } from './helper'
import { copy } from '@/util'

export default function () {
  const [state, setState] = useSetState(
    {
      url: 'https://example.com/#/own/tool/url-analysis/page?id=123&name=john&category=books',
    },
    location.hash,
  )

  const [url, hash, paramsString] = parseUrlParams(state.url)

  return (
    <Grid
      className="tool__url-analysis"
      style={{ gridTemplateColumns: '1fr 1fr' }}
    >
      <TextArea
        value={state.url || ''}
        style={{
          height: 'auto',
          fontSize: 18,
        }}
        onChange={(e: any) => {
          setState({
            url: e.target.value || '',
          })
        }}
      />
      <Flex column>
        <Flex between style={{ width: '100%' }}>
          <h3>URL</h3>
          <Button onClick={() => copy(url)}>Copy</Button>
        </Flex>
        <pre>{url}</pre>
        {hash && (
          <>
            <Flex between style={{ width: '100%' }}>
              <h3>Hash</h3>
              <Button onClick={() => copy(hash)}>Copy</Button>
            </Flex>
            <pre>{hash}</pre>
          </>
        )}
        <Flex between style={{ width: '100%' }}>
          <h3>Params</h3>
          <Button onClick={() => copy(paramsString)}>Copy</Button>
        </Flex>
        <pre>{paramsString}</pre>
      </Flex>
    </Grid>
  )
}
