import React from 'react'
// import { Logo } from '@/components'
import { Outlet, useNavigate } from 'react-router'
import './index.less'
import { ToolRouter } from './router'
import { Container } from '@/components'

export function Tool() {
  const nav = useNavigate()

  return (
    <Container>
      <div className="tool">
        <div className="tool-layout-left">
          <div>
            {ToolRouter.children.map((item, i) => {
              const { name, path } = item
              return (
                <div key={i} className="card" onClick={() => nav(path)}>
                  {/* <Logo label={name} /> */}
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
