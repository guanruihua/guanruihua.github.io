import React from 'react'
import { useNavigate } from 'react-router'
import './index.less'
import { SandboxSettingDialog } from './sandbox/setting-dialog'
import { useSetState } from '0hook'
import { conf } from './conf'
import { ObjectType } from '0type'
import { Guide, GuideProps } from '@/components'
import { useFetchArrayState } from '@/hook'

export function DevHomePage() {
  const nav = useNavigate()
  const [state, setState] = useSetState<ObjectType>({ open: false })
  const [guide] = useFetchArrayState<GuideProps[]>('/dev-guide.json')

  const handleClick = (name: string, url?: string) => {
    if (name === 'sandbox') {
      setState({ open: true })
      return
    }
    if (url) {
      return window.open(url, '_blank')
    } else nav(name)
  }
  return (
    <div className="dev-page">
      <div className="layout">
        {conf.map(([name, label, style, url]) => {
          return (
            <div
              className="dev-page-modules-card"
              key={name}
              style={style as any}
              onClick={() => handleClick(name, url)}
            >
              <div className="logo">{label.slice(0, 1)}</div>
              <div className="name">{label}</div>
            </div>
          )
        })}
      </div>
      <Guide guide={guide || []} />
      <SandboxSettingDialog state={state} setState={setState} />
    </div>
  )
}
