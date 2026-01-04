import { isArray, isString } from 'asura-eye'
import { Args } from '../type'
import { legend } from './conf'
import { ObjectType } from '0type'

export const getLinesOptions = (args: Args) => {
  const { data = [] } = args
  // const { xData = [], yData = [] } = data2xyData(data)
  let xData: string[] = []
  const yData: ObjectType[] = []

  data?.forEach(item => {
    const { name } = item
    if (isString(name) && isArray(item.data)) {
      if (xData.length === 0) xData = item.data.map(_ => _.name)
      yData.push({
        name,
        type: 'line',
        stack: 'Total',
        data: item.data.map(_ => _.value),
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
