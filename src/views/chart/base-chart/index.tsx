import { Chart, echarts } from 'aurad'
import React from 'react'
import { getOptions } from './options'
import { useLoadJS } from '@/hook'

export default function () {
  const [options, setOptions] = React.useState<any>(undefined)

  useLoadJS('/js/echarts-stat/1.2.0/ecStat.min.js', () => {
    echarts.registerTransform((window as any).ecStat.transform.regression)
    setOptions(getOptions())
  })

  return (
    <div className="chart__base-chart">
      {options && (
        <Chart style={{  height: 600  }} options={options} />
      )}
    </div>
  )
}
