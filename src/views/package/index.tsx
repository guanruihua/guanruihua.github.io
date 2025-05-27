import React from 'react'
import {} from 'aurad'
import { isEffectArray } from 'asura-eye'
import { NPMCmd } from './components'
import './index.less'
import type { PkgConf } from './type'
import { adapter } from './utils'
import { Container } from '@/components'

const handleClick = (item: PkgConf) => {
  if (item.home) {
    window.open(item.home, '_blank')
    return
  }
  window.open(`https://www.npmjs.com/package/${item.name}`, '_blank')
}

export function Pkg() {
  const [state, setState] = React.useState<PkgConf[]>([])

  const init = async () => {
    try {
      const res = await fetch('/pkg.json')
      const data = await res.json()
      setState(data.map(adapter))
    } catch (error) {
      console.error(error)
    }
  }

  const [num, setNum] = React.useState<number>(5)
  const resize = () => {
    const { width } = document.body.getBoundingClientRect()
    const num = Math.min(9, Math.floor(width / 360))
    setNum(num)
  }

  React.useEffect(() => {
    init()
    resize()
    window.onresize = resize
  }, [])

  return (
    <Container>
      <div className="package">
        <div className="layout" style={{ columnCount: num }}>
          {state.map((_, i) => {
            return (
              <div className="card" key={i}>
                <div className="header" onClick={() => handleClick(_)}>
                  <div className="label">{_.label}</div>
                </div>
                <div className="shields">
                  {isEffectArray<any>(_.shields) &&
                    _.shields.map((item, i) => {
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
                {_.desc && <div className="desc">{_.desc}</div>}
                {_.install !== false &&
                  _.name &&
                  !isEffectArray(_.installNames) && (
                    <div className="install">
                      <NPMCmd name={_.installName ?? _.name} />
                    </div>
                  )}
                {_.install !== false &&
                  isEffectArray(_.installNames) &&
                  _.installNames.map((name: string) => (
                    <div className="install" key={name}>
                      <NPMCmd name={name} />
                    </div>
                  ))}
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
    </Container>
  )
}
