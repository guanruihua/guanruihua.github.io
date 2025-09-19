import React from 'react'
import './core'
import { Button, Flex, Grid, TextArea } from 'aurad'
import './index.less'
import { useSetState } from '0hook'
import { htmlToReactEnhanced } from './core'
import { copy } from '@/util'

export default function () {
  const [state, setState] = useSetState(
    {
      htmlText: `<div class="container" style="color: red; background-color: blue;">
  <h1 id="title" onClick="handleClick">Hello World</h1>
  <h1 id="title" onclick="handleClick">Hello World</h1>
  <p>This is a paragraph with <strong>bold text</strong>.</p>
  <input type="text" placeholder="Enter your name" />
  <input type="text" placeholder="Enter your name" >
</div>`,
    },
    'tool__html-to-react__cache',
  )

  const reactCode = htmlToReactEnhanced(state.htmlText || '')

  return (
    <div className="tool__html-to-react">
      <Flex column style={{ width: '100%' }}>
        <Flex>
          <Button
            disabled={!state.htmlText}
            onClick={() => setState({ htmlText: '' })}
          >
            Clear
          </Button>
          <Button disabled={!state.htmlText} onClick={() => copy(reactCode)}>
            Copy
          </Button>
        </Flex>
        <Grid columns={2} rows={1} style={{ width: '100%' }}>
          <TextArea
            value={state.htmlText}
            onChange={(e: any) => {
              setState({
                htmlText: e.target.value || '',
              })
            }}
          />
          <textarea value={reactCode} onChange={(e) => {}} />
        </Grid>
      </Flex>
      <br />
      <a href="https://transform.tools/html-to-jsx" target="__blank">
        transform (html-to-jsx)
      </a>
    </div>
  )
}
