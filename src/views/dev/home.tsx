import React from 'react'
import { useNavigate } from 'react-router'
import './index.less'
import { SandboxSettingDialog } from './sandbox/setting-dialog'
import { useSetState } from '0hook'
import { conf } from './conf'
import { ObjectType } from '0type'

export function DevHomePage() {
  const nav = useNavigate()
  const [state, setState] = useSetState<ObjectType>({ open: false, })

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
      <div className="dev-page-modules">
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
      <SandboxSettingDialog state={state} setState={setState} />
    </div>
  )
}
