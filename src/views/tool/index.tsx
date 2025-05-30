import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import { ToolRouter } from './router'
import { Container } from '@/components'
import { useSetState } from '0hook'
import { classNames } from 'harpe'
import './index.less'

export function Tool() {
  const nav = useNavigate()
  const [state, setState] = useSetState({ left: true }, '__state__tool')

  React.useEffect(() => {
    if (location.hash.indexOf('#/tool') > -1) {
      nav(ToolRouter.children[0].path)
    }
  }, [])

  return (
    <Container
      header={
        <div
          className={classNames('control', {
            disabled: !state.left,
          })}
          onClick={() => setState({ left: !state.left })}
        >
          Left
        </div>
      }
    >
      <div
        className="tool"
        style={state.left === false ? { gridTemplateColumns: '1fr' } : {}}
      >
        <div
          className={classNames('tool-layout-left', {
            none: state.left === false,
          })}
        >
          <div>
            {ToolRouter.children.map((item, i) => {
              const { name, path } = item
              return (
                <div key={i} className="menu" onClick={() => nav(path)}>
                  <div className="name" title={name}>
                    {name}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="tool-layout-right">
          <Outlet />
        </div>
      </div>
    </Container>
  )
}
