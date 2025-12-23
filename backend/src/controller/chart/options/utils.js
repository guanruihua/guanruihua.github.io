import { isArray } from 'asura-eye'

export const data2xyData = (data) => {
  const xData = []
  const yData = []
  if (isArray(data)) {
    data.forEach(({ name, value }) => {
      xData.push(name)
      yData.push(value)
    })
  }
  return { xData, yData }
}
