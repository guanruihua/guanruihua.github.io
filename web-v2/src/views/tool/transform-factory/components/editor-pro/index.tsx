import useEditorPro from './state.tsx'
import { Editor } from '@monaco-editor/react'
import './index.less'
import { Button } from 'antd'

export interface EditorProProps {
  lang: string
  value: string
  dataKey: string
  setValue?(val: string): void
  [key: string]: any
}

export function EditorPro(props: EditorProProps) {
  const { lang } = props
  const {
    state,
    setValue,
    hasError,
    template,
    handleEditorDidMount,
    handleClick,
  } = useEditorPro(props)

  const disabled = !state?.value

  const btns_default = [
    ['Copy', '复制'],
    ['Format', '格式化'],
    ['Compress', '压缩', { disabled: hasError || disabled }],
    ['Template', 'Template', { disabled: !template }],
    ['Clear', '清空'],
  ]

  const MyButton = ({ item }) => {
    const [key, label, conf = {}]: any[] = item
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { selectHighlight, ...buttonProps } = conf
    const keys = Object.keys(buttonProps)
    if (!keys.includes('disabled')) {
      buttonProps.disabled = conf.disabled
    }
    // if (selectHighlight && state.to_lang === key) {
    //   buttonProps.type = 'primary'
    // } else {
    //   buttonProps.type = buttonProps.type || 'default'
    // }

    return (
      <Button key={key} onClick={() => handleClick(key)} {...buttonProps}>
        {label}
      </Button>
    )
  }

  return (
    <div className="editor-pro">
      <div className="editor-pro-tools">
        {btns_default.map((item, i) => (
          <MyButton key={i} item={item} />
        ))}
      </div>
      <div className="editor-pro-area">
        <Editor
          key={state.editor_key}
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
          defaultValue={state.value}
          value={state.value}
          onMount={handleEditorDidMount}
          onChange={setValue}
        />
      </div>
    </div>
  )
}
