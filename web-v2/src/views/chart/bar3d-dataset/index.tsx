// import { Chart, echarts } from 'aurad'
import React from 'react'
import { getOptions } from './options'
// import { useLoadJS } from '@/hook'
import { Chart } from './chart'
// import * as echarts from 'echarts/core'

export default function () {
  const [options, setOptions] = React.useState<any>(getOptions())

  // useLoadJS('/js/echarts-gl/2.0.9/echarts-gl.min.js', () => {
  //   console.log(window) // 应该返回对象
  //   // console.log(window?.echarts, window?.echarts?.graphic) // 应该返回对象
  //   // setOptions(getOptions())
  // })

  return (
    <div className="chart__base-chart">
      <Chart style={{ height: 600, width: 1200 }} options={options} />
    </div>
  )
}
