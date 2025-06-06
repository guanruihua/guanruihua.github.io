import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import { ToolRouter } from './router'
import { Container } from '@/components'
import { useSetState } from '0hook'
import { classNames } from 'harpe'
import './index.less'
import { Div } from 'aurad'
import { select } from 'abandonjs'

export function Tool() {
  const nav = useNavigate()
  const [state, setState] = useSetState({ left: true }, '__state__tool')

  React.useEffect(() => {
    if (['#/tool', '#/tool/'].includes(location.hash)) {
      nav(ToolRouter.children[0].path)
    }
  }, [location.hash])

  const nowHash = location.hash.replace('#/tool/', '')
  
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
                <Div
                  key={i}
                  className={['menu', { select: path === nowHash }]}
                  onClick={() => nav(path)}
                >
                  <div className="name" title={name}>
                    {name}
                  </div>
                </Div>
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
