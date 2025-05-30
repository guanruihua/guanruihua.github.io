import React from 'react'
import {
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import { files } from './files'
import { MonacoEditor } from './monacoEditor'
import { SettingIcon } from './icon'
import { SettingDialog } from './setting-dialog'
import { useSetState } from '0hook'
import { ObjectType } from '0type'
import './index.less'
import { isArray } from 'asura-eye'
import { useSearchParams } from 'react-router-dom'

export function Sandbox() {
  const [search] = useSearchParams()
  const [state, setState] = useSetState<{
    type: 'react' | 'vue'
    [key: string]: any
  }>(
    {
      type: 'react',
      //  'vue',
      open: false,
      dependencies: {
        react: [
          ['antd', 'latest'],
          ['0type', 'latest'],
          ['aurad', 'latest'],
          ['abandonjs', 'latest'],
          ['asura-eye', 'latest'],
          ['axios', 'latest'],
        ],
        vue: [
          ['element-plus', 'latest'],
          ['0type', 'latest'],
          ['aurad', 'latest'],
          ['abandonjs', 'latest'],
          ['asura-eye', 'latest'],
          ['axios', 'latest'],
        ],
      },
    },
  )
  const { type = 'react' } = state
  React.useEffect(() => {
    setState({ type: (search.get('type') as any) || 'react' })
  }, [])
  // console.log(
  //   // state,
  //   search.get('type'),
  // )

  const getDependencies = () => {
    const renderDependencies: ObjectType<string> = {}
    if (isArray(state?.dependencies?.[type])) {
      state.dependencies[type].forEach((item) => {
        const [name, version] = item
        renderDependencies[name] = version
      })
    }
    return renderDependencies
  }

  return (
    <div className="sandbox">
      <SandpackProvider
        customSetup={{
          dependencies: getDependencies(),
        }}
        files={files[type]}
        template={type}
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
              height: 'calc(100vh - 32px)',
            }}
          />
          <div
            className="sandbox-settings"
            onClick={() => setState({ open: true })}
          >
            {SettingIcon}
          </div>
          <MonacoEditor />
          <SandpackPreview
            style={{
              height: '100vh',
            }}
          />
        </SandpackLayout>
        <SettingDialog state={state} setState={setState} />
      </SandpackProvider>
    </div>
  )
}
