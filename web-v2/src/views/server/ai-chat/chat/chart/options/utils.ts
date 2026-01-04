import { isArray } from 'asura-eye'

export const data2xyData = (data: any) => {
  const xData: any[] = []
  const yData: any[] = []
  if (isArray(data)) {
    data.forEach(({ name, value }: any) => {
      xData.push(name)
      yData.push(value)
    })
  }
  return { xData, yData }
}
