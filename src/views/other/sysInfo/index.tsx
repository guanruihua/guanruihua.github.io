import { ObjectType } from '0type'
import { Grid } from 'aurad'
import React from 'react'
import { getCpuInfo } from './util'
import './index.less'

export default function SystemInfo() {
  const [state, setState] = React.useState<ObjectType>({})
  const init = async () => {
    setState(await getCpuInfo())
  }
  React.useEffect(() => {
    init()
  }, [])

  const list = [
    ['CPU逻辑核心数', 'cpuCores'],
    ['GPU供应商', 'vendor'],
    ['GPU', 'gpu'],
    ['已使用内存', 'usedJSHeapSize', 'MB'],
    ['当期堆上限', 'totalJSHeapSize', 'MB'],
    ['堆内存上限', 'jsHeapSizeLimit', 'MB'],
    ['User Agent', 'userAgent'],
  ]

  return (
    <Grid
      className="sys-info system-information"
      style={{
        gridTemplateColumns: 'auto 1fr',
      }}
    >
      {list.map((item, i) => {
        const [label, prop, unit = ''] = item
        return (
          <React.Fragment key={i}>
            <div className="label">{label}</div>
            <div className="value">
              {state[prop] ? state[prop] + unit : '未知'}
            </div>
          </React.Fragment>
        )
      })}
    </Grid>
  )
}
