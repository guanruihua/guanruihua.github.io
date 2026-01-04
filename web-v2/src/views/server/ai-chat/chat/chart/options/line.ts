import { Args } from '../type'
import { legend } from './conf'
import { data2xyData } from './utils'

export const getLineOptions = (args: Args) => {
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
