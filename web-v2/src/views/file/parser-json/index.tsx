import React from 'react'
import { Button, Flex, Grid } from 'aurad'
import ReactJsonView from '@microlink/react-json-view'
import { useSetState } from '0hook'
import Editor from '@monaco-editor/react'
import { isString } from 'asura-eye'
import { copy, downloadJSON } from '@/util'

export default function () {
  const [state, setState] = useSetState(
    {
      json: '{}',
      previewJson: {},
      // '1' | '0'
      compression: '0',
      errorMsg: '',
    },
    location.hash,
  )

  const previewObject = (value: string) => {
    if (!isString(value)) return '{}'
    try {
      if (state.compression === '1') {
        return JSON.stringify(JSON.parse(value))
      }
      return JSON.stringify(JSON.parse(value), null, 2)
    } catch (error) {
      return '{}'
    }
  }
  const onChange = (json: string) => {
    const newState = {
      json,
      previewJson: {},
      errorMsg: '',
    }
    const toJSON = (value: any) => {
      if (!isString(value)) return {}
      try {
        return JSON.parse(value)
      } catch (error) {
        newState.errorMsg = String(error)
        // console.log(error)
        return {}
      }
    }
    newState.previewJson = toJSON(json)
    setState(newState)
  }
  // console.log(state)
  const Preview = () => {
    if (state?.errorMsg) return <pre>{state.errorMsg}</pre>
    if (state.compression === '1')
      return <pre>{previewObject(state?.json || '{}')}</pre>
    return (
      <ReactJsonView
        style={{
          borderRadius: 8,
          padding: 10,
          maxHeight: '100vh',
        }}
        theme={'colors'}
        src={state.previewJson || {}}
      />
    )
  }
  return (
    <Grid
      className="file__parser-json"
      columns={2}
      style={{
        gridTemplateRows: 'auto 1fr',
      }}
    >
      <Flex row style={{ gridColumn: '1/-1', height: '100%' }}>
        <Button
          type={state.compression === '1' ? 'primary' : 'default'}
          onClick={() =>
            setState({ compression: state.compression === '1' ? '0' : '1' })
          }
        >
          压缩
        </Button>
        <Button onClick={() => copy(previewObject(state?.json || '{}'))}>
          复制
        </Button>
        <Button
          onClick={() =>
            downloadJSON(previewObject(state?.json || '{}'), 'temp.json')
          }
        >
          下载
        </Button>
      </Flex>
      <Editor
        height="100%"
        defaultLanguage="json"
        value={state?.json || ''}
        theme="vs-dark"
        options={{
          // readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'off',
          folding: true,
          wordWrap: 'on',
        }}
        onChange={onChange}
      />
      <Preview />
    </Grid>
  )
}
