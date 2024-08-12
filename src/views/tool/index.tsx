import React from 'react'
import './index.less'
import { Conf } from './conf'
import { Logo } from '@/components'

const handleClick = (url: string) => {
  window.open(`https://${url}`, '_blank')
}

export function Tool() {
  return (
    <div className="tool">
      <div className="layout">
        {Conf.map((item, i) => {
          const [name, logo, tags] = item
          return (
            <div key={i} className="card" onClick={()=>handleClick(logo)}>
              <Logo logo={logo} label={name} />
              <div className="name">{name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
