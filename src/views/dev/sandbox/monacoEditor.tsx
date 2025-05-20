import React from 'react'
import {
  FileTabs,
  SandpackStack,
  useActiveCode,
  useSandpack,
} from '@codesandbox/sandpack-react'
import Editor from '@monaco-editor/react'
import { getLanguageFromFile } from './util'

export const MonacoEditor = () => {
  const { code, updateCode } = useActiveCode()
  const { sandpack } = useSandpack()
  // console.log(sandpack)
  return (
    <SandpackStack style={{ height: '100vh', margin: 0 }}>
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 8, background: '#1e1e1e' }}>
        <Editor
          width="100%"
          height="100%"
          language={getLanguageFromFile(sandpack.activeFile)}
          theme="vs-dark"
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value) => updateCode(value || '')}
        />
      </div>
    </SandpackStack>
  )
}
