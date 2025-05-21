import React from 'react'
import {
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import { Dependencies, Files } from './conf'
import { MonacoEditor } from './monacoEditor'
import './index.less'
import { useSearchParams } from 'react-router-dom'

const getConf = (search: URLSearchParams) => {
  let { template = 'react', ...dependencies } = Object.fromEntries(search) || {}
  if (!['react', 'vue', 'static'].includes(template)) {
    template = 'react'
  }
  return {
    template,
    files: Files[template],
    dependencies: {
      ...Dependencies[template],
      ...dependencies,
    },
  } as {
    template: 'react' | 'vue' | 'static'
    files: any
    dependencies: any
  }
}

export function Sandbox() {
  const [search] = useSearchParams()

  const conf = getConf(search)

  // console.log(
  //   // state,
  //   search,
  //   Object.fromEntries(search),
  //   conf,
  // )

  return (
    <div className="sandbox">
      <SandpackProvider
        customSetup={{
          dependencies: conf.dependencies,
        }}
        files={conf.files}
        template={conf.template}
        theme="auto"
      >
        <SandpackLayout
          style={{
            width: '100vw',
            height: '100vh',
            background: '#151515',
          }}
        >
          <SandpackFileExplorer
            style={{
              height: '100vh',
            }}
          />
          <MonacoEditor />
          {/* <SandpackCodeEditor
          closableTabs
          showTabs
          wrapContent
          style={{
            height: '100vh',
          }}
        /> */}
          <SandpackPreview
            style={{
              height: '100vh',
            }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
