import { ObjectType } from '0type'

export const getOptions1 = () => {
  return {
    xAxis: {
      type: 'category',
      data: ['标题1', '标题2', '标题3', '标题4', '标题5', '标题6'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      // 第二组（2-4堆叠）
      {
        name: '产品B',
        type: 'bar',
        stack: 'group1',
        data: [
          { value: 40, name: '标题1' },
          { value: 40, name: '标题2' },
          { value: 40, name: '标题3' },
          { value: 40, name: '标题4' },
          { value: 40, name: '标题5' },
          { value: 40, name: '标题6' },
        ],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(169, 244, 209, 1)' },
              { offset: 1, color: 'rgba(45, 222, 222, 1)' },
            ],
          },
          borderRadius: [50, 50, 0, 0],
        },
        barWidth: '20%',
        animationDuration: 1000,
        animationEasing: 'cubicOut',
        z: 9,
      },
      {
        name: '产品C',
        type: 'bar',
        stack: 'group1',
        data: [
          { value: 30, name: '标题1' },
          { value: 30, name: '标题2' },
          { value: 30, name: '标题3' },
          { value: 30, name: '标题4' },
          { value: 30, name: '标题5' },
          { value: 30, name: '标题6' },
        ],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(115, 216, 226, 1)' },
              { offset: 1, color: 'rgba(73, 127, 237, 1)' },
            ],
          },
          borderColor: 'transparent',
          borderWidth: 0,
          shadowColor: 'rgba(73, 127, 237, 1)',
          shadowOffsetY: 15,
          borderRadius: [50, 50, 0, 0],
        },
        barWidth: '20%',
        z: 8,
      },
      {
        name: '产品D',
        type: 'bar',
        stack: 'group1',
        data: [
          { value: 10, name: '标题1' },
          { value: 10, name: '标题2' },
          { value: 10, name: '标题3' },
          { value: 10, name: '标题4' },
          { value: 10, name: '标题5' },
          { value: 10, name: '标题6' },
        ],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(224, 252, 187, 1)' },
              { offset: 1, color: 'rgba(142, 236, 233, 1)' },
            ],
          },
          borderRadius: [50, 50, 0, 0],
          borderColor: 'transparent',
          borderWidth: 0,
          shadowColor: 'rgba(142, 236, 233, 1)',
          shadowOffsetY: 15,
        },
        barWidth: '20%',
        z: 7,
      },
    ],
  }
}

export const getOptions2 = () => {
  var series = [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      stack: 'a',
      name: 'a',
    },
    {
      data: [10, 46, 64, '-', 0, '-', 0],
      type: 'bar',
      stack: 'a',
      name: 'b',
    },
    {
      data: [30, '-', 0, 20, 10, '-', 0],
      type: 'bar',
      stack: 'a',
      name: 'c',
    },
    {
      data: [30, '-', 0, 20, 10, '-', 0],
      type: 'bar',
      stack: 'b',
      name: 'd',
    },
    {
      data: [10, 20, 150, 0, '-', 50, 10],
      type: 'bar',
      stack: 'b',
      name: 'e',
    },
  ]
  const stackInfo: ObjectType = {}
  for (let i = 0; i < series[0].data.length; ++i) {
    for (let j = 0; j < series.length; ++j) {
      const stackName = series[j].stack
      if (!stackName) {
        continue
      }
      if (!stackInfo[stackName]) {
        stackInfo[stackName] = {
          stackStart: [],
          stackEnd: [],
        }
      }
      const info = stackInfo[stackName]
      const data = series[j].data[i]
      if (data && data !== '-') {
        if (info.stackStart[i] == null) {
          info.stackStart[i] = j
        }
        info.stackEnd[i] = j
      }
    }
  }
  for (let i = 0; i < series.length; ++i) {
    const data: any = series[i].data
    const info = stackInfo[series[i].stack]
    for (let j = 0; j < series[i].data.length; ++j) {
      // const isStart = info.stackStart[j] === i;
      const isEnd = info.stackEnd[j] === i
      const topBorder = isEnd ? 20 : 0
      const bottomBorder = 0
      data[j] = {
        value: data[j],
        itemStyle: {
          borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder],
        },
      }
    }
  }
  return {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: series,
  }
}


export const getOptions = (type: string) => {
  if(type === '1') return getOptions1()
  if(type === '2') return getOptions2()
  return {}
}