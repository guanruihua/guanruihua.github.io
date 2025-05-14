import React from 'react'
import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import { files } from './files'

export function Sandbox() {
  return (
    <SandpackProvider files={files} theme="auto" template="react">
      <SandpackLayout
        style={{
          width: '100vw',
          height: '100vh',
        }}
      >
        <SandpackFileExplorer
          style={{
            height: '100vh',
          }}
        />
        <SandpackCodeEditor
          closableTabs
          showTabs
          wrapContent
          style={{
            height: '100vh',
          }}
        />
        <SandpackPreview
          style={{
            height: '100vh',
          }}
        />
      </SandpackLayout>
    </SandpackProvider>
  )
}
