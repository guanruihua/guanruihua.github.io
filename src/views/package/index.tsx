import React from 'react'
import {} from 'aurad'
import { isEffectArray } from 'asura-eye'
import { NPMCmd } from './components'
import './index.less'
import { pkgConf } from './conf'
import { PkgConf } from './type'
import { classNames } from 'harpe'

const handleClick = (item: PkgConf) => {
  if (item.home) {
    window.open(item.home, '_blank')
    return
  }
  window.open(`https://www.npmjs.com/package/${item.name}`, '_blank')
}

const Logo = (props: PkgConf) => {
  const [status, setStatus] = React.useState<boolean>(false)

  const { logo, label } = props

  return (
    <div className="logo-layout">
      <span className={classNames('logo-layout-label', { hidden: status })}>
        {label.slice(0, 1).toUpperCase()}
      </span>
      <span className={classNames('logo-layout-img', { hidden: !status })}>
        {logo && <img src={logo} alt="logo" onLoad={() => setStatus(true)} />}
      </span>
    </div>
  )
}
export function Pkg() {
  return (
    <div className="package">
      <div className="layout">
        {pkgConf.map((_, i) => {
          return (
            <div className="card" key={i}>
              <div className="header" onClick={() => handleClick(_)}>
                <div className="logo">
                  <Logo {..._} />
                  {/* {_.logo ? (
                    <img src={_.logo} />
                  ) : (
                    _.label.slice(0, 1).toUpperCase()
                  )} */}
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
                <div className="tags">
                  {_.tags.map((tag: string, i: number) => (
                    <div className="tag" key={'tag' + i}>
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
