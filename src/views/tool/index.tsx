import React from 'react'
import { Conf } from './conf'
import { Logo } from '@/components'
import { Outlet, useNavigate } from 'react-router'
import { ObjectType } from '0type'
import './index.less'

const handleClick = (url: string) => {
  window.open(`https://${url}`, '_blank')
}

export function Tool() {
  const nav = useNavigate()
  const list: ObjectType[] = [
    {
      path: 'randomPwd',
      name: '随机密码',
    },
    {
      path: 'converter/Chinese',
      name: '简繁体转换',
    },
  ]
  return (
    <div className="tool">
      <div className="tool-layout-left">
        {list.map((item, i) => {
          const { name, path } = item
          return (
            <div key={i} className="card" onClick={() => nav(path)}>
              <Logo label={name} />
              <div className="name" title={name}>
                {name}
              </div>
            </div>
          )
        })}
        {Conf.map((item, i) => {
          const [name, logo, tags] = item
          return (
            <div key={i} className="card" onClick={() => handleClick(logo)}>
              <Logo logo={logo} label={name} />
              <div className="name" title={name}>
                {name}
              </div>
            </div>
          )
        })}
      </div>
      <div className="tool-layout-right">
        <Outlet />
      </div>
    </div>
  )
}
