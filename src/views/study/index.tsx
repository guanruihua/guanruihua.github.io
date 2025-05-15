import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import './index.less'
import './md.less'
import { useSetState } from '0hook'

const conf = [
  {
    label: 'CSS',
    children: [
      {
        label: 'flex',
        path: 'css-flex',
      },
      {
        label: 'grid',
        path: 'css-grid',
      },
    ],
  },
  {
    label: '示例',
    children: [
      {
        label: '字体描边',
        path: 'font-stroke',
      },
    ],
  },
  {
    label: 'Other',
    children: [
      {
        label: 'Dev',
        path: 'dev',
      },
    ],
  },
]

export function Study() {
  const nav = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const [state, setState] = useSetState({})

  return (
    <div className="study-page">
      {pathname === '/study' && (
        <div className="study-page-module-layout">
          {conf.map((item, i) => {
            return (
              <div className="study-page-module" key={i}>
                <h3 className="study-page-module-title">{item.label}</h3>
                {item.children && (
                  <div className="study-page-module-box">
                    {item.children.map((child, j) => {
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
  )
}
