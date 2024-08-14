import React from 'react'
import {} from 'aurad'
import { isEffectArray } from 'asura-eye'
import { NPMCmd } from './components'
import './index.less'
import { pkgConf } from './conf'
import type { PkgConf } from './type'
import { adapter } from './utils'
import { Logo } from '@/components'

const handleClick = (item: PkgConf) => {
  if (item.home) {
    window.open(item.home, '_blank')
    return
  }
  window.open(`https://www.npmjs.com/package/${item.name}`, '_blank')
}
const renderPkgConf = pkgConf.map(adapter)

export function Pkg() {
  const [num, setNum] = React.useState<number>(5)
  const resize = () => {
    const { width } = document.body.getBoundingClientRect()
    const num = Math.min(9, Math.floor(width / 360))
    setNum(num)
  }
  React.useEffect(() => {
    resize()
    window.onresize = resize
  }, [])
  return (
    <div className="package">
      <div className="layout" style={{ columnCount: num }}>
        {renderPkgConf.map((_, i) => {
          return (
            <div className="card" key={i}>
              <div className="header" onClick={() => handleClick(_)}>
                <div className="logo">
                  <Logo {..._} />
                </div>
                <div className="label">{_.label}</div>
              </div>
              {_.desc && <div className="desc">{_.desc}</div>}
              {_.install !== false && _.name && (
                <div className="install">
                  <NPMCmd name={_.name} />
                </div>
              )}
              {isEffectArray<any>(_.shields) && (
                <div className="shields">
                  {_.shields.map((item, i) => {
                    if (item.type === 'Non-Open-Source') {
                      return (
                        <span key={i} className="Non-Open-Source">
                          Non-Open-Source
                        </span>
                      )
                    }
                    return (
                      <a key={i} href={item.url} target="_blank">
                        <img src={item.logo} />
                      </a>
                    )
                  })}
                </div>
              )}
              {isEffectArray(_.tags) && (
                <div className="tags" key={num}>
                  {_.tags.map((tag: string, i: number) => (
                    <div className="tag" key={tag + 'tag' + i}>
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
