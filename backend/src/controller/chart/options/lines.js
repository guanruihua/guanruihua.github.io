import { isArray, isString } from 'asura-eye'
import { legend } from './conf.js'

export const getLinesOptions = (args) => {
  const { data = [] } = args
  // const { xData = [], yData = [] } = data2xyData(data)
  let xData = []
  const yData = []

  data?.forEach((item) => {
    const { name } = item
    if (isString(name) && isArray(item.data)) {
      if (xData.length === 0) xData = item.data.map((_) => _.name)
      yData.push({
        name,
        type: 'line',
        stack: 'Total',
        data: item.data.map((_) => _.value),
      })
    }
  })

  return {
    tooltip: { trigger: 'axis' },
    legend,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData || [],
    },
    yAxis: {
      type: 'value',
    },
    series: yData || [],
  }
}
