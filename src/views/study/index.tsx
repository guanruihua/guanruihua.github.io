import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import './index.less'
import './md.less'
import { Container } from '@/components'
import { TREE }from './router'

export function Study() {
  const nav = useNavigate()
  const location = useLocation()
  const { pathname } = location

  return (
    <Container>
      <div className="study-page">
        {pathname === '/study' && (
          <div className="study-page-module-layout">
            {Object.values(TREE).map((item, i) => {
              return (
                <div className="study-page-module" key={i}>
                  <h3 className="study-page-module-title">{item.label}</h3>
                  {item.child && (
                    <div className="study-page-module-box">
                      {item.child.map((child, j) => {
                        return (
                          <div
                            key={j}
                            className="study-page-module-item"
                            onClick={() => nav(child.path)}
                          >
                            {child.label}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
        <Outlet />
      </div>
    </Container>
  )
}
