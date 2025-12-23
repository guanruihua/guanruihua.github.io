import { legend } from './conf.js'
import { data2xyData } from './utils.js'

export const getLineOptions = (args) => {
  const { data = [] } = args
  const { xData = [], yData = [] } = data2xyData(data)

  return {
    tooltip: { trigger: 'axis' },
    legend,
    xAxis: {
      type: 'category',
      data: xData || [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: yData || [],
        type: 'line',
      },
    ],
  }
}
