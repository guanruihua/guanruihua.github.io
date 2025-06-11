import React from 'react'
import {} from 'aurad'
import { isEffectArray, isString } from 'asura-eye'
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
  // window.open(`https://www.npmjs.com/package/${item.name}`, '_blank')
}

export default function Pkg() {
  const [state, setState] = React.useState<PkgConf[]>([])
  const init = async () => {
    try {
      const res = await fetch('/pkg.json')
      const data = await res.json()
      const newState = data.map(adapter)
      setState(newState)
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
                    _.shields.map((item, i) =>
                      item.url ? (
                        <a key={i} href={item.url} target="_black">
                          <img src={item.logo} />
                        </a>
                      ) : (
                        <img key={i} src={item.logo} />
                      ),
                    )}
                </div>

                {_.desc && <div className="desc">{_.desc}</div>}

                {isString(_.install) && (
                  <div className="install">
                    <NPMCmd name={_.install} />
                  </div>
                )}

                {isEffectArray(_.install) &&
                  _.install.map((name: string) => (
                    <div className="install" key={name}>
                      <NPMCmd name={name} />
                    </div>
                  ))}

                {isEffectArray(_.tags) && (
                  <div className="tags" key={num}>
                    {_.tags.map((tag: string, i: number) => (
                      <div className="tag" key={i}>
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
