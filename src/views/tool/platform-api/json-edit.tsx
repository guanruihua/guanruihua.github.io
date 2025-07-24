import React from 'react'
import { Button, Grid } from 'aurad'
import { Editor } from '@monaco-editor/react'

export interface JsonEditProps {
  value?: string
  onChange(val: string): void
  [key: string]: any
}

export function JsonEdit(props: JsonEditProps) {
  const { value = '{}', onChange } = props
  const editorRef = React.useRef<any>(null)

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor
    // 修改 JSON 诊断选项以允许注释
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      allowComments: true, // 关键设置
      trailingCommas: 'ignore',
      schemas: [],
      validate: true,
    })
  }

  const handleFormat = async () => {
    if (editorRef.current) {
      await editorRef.current.getAction('editor.action.formatDocument').run()
    }
  }

  return (
    <Grid
      style={{
        gridTemplateColumns: '1fr auto',
      }}
    >
      <Editor
        height="600px"
        width="100%"
        theme="vs-dark"
        defaultLanguage="json"
        options={{
          formatOnPaste: true, // 粘贴时自动格式化
          formatOnType: true, // 输入时自动格式化
          automaticLayout: true,
          scrollBeyondLastLine: false, // 禁止滚动超过最后一行
        }}
        defaultValue={value}
        onMount={handleEditorDidMount}
        onChange={onChange}
      />
      <Grid>
        <Button onClick={handleFormat} style={{ marginBottom: '10px' }}>
          Format
        </Button>
      </Grid>
    </Grid>
  )
}
