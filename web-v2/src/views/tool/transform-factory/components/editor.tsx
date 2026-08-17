import { Editor } from '@monaco-editor/react'
import { State } from '../store'
type Props = {
  state: State
  lang?: string
}

export default function EditorArea(props: Props) {
  const { state, lang = 'json' } = props

  return (
    <Editor
      key={state.to_editor_key}
      height="100%"
      width="100%"
      theme="vs-dark"
      defaultLanguage={lang}
      language={lang}
      options={{
        formatOnPaste: true, // 粘贴时自动格式化
        formatOnType: true, // 输入时自动格式化
        wordWrap: 'on',
        automaticLayout: true,
        scrollBeyondLastLine: false, // 禁止滚动超过最后一行
      }}
      value={state.to_value}
      onChange={(value) => {
        state.set({ to_value: value })
      }}
    />
  )
}
