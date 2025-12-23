import { data2xyData } from './utils.js'

const Cfg = {
  dataZoom: [
    {
      show: true,
      type: 'slider',
      startValue: 0,
      // endValue: 7,
      yAxisIndex: [0],
    },
  ],
  // toolbox: getToolbox(),
  grid: {
    top: '10%',
    left: '8%',
    right: '5%',
    bottom: '17%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
    },
  },
}

export const getBarOptions = (args) => {
  const { data = [] } = args
  const { xData = [], yData = [] } = data2xyData(data)

  const options = {
    ...Cfg,
    xAxis: {
      type: 'value',
      boundaryGap: false,
      minInterval: 1,
      axisLabel: { clickable: false },
    },
    yAxis: {
      type: 'category',
      // triggerEvent: true,
      // inverse: true,
      boundaryGap: true,
      // data: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ],
      data: xData,
      axisLabel: {
        show: true,
        clickable: false,
        lineStyle: { color: '#f2f2f2' },
        formatter: function (value) {
          let texts = value
          if (texts.length > 20) {
            // 限制长度自设
            texts = texts.substr(0, 20) + '...'
          }
          return texts
        },
      },
    },
    series: [
      {
        data: yData,
        // data: [ 150, 230, 224, 218, 135, 147, 260 ],
        type: 'bar',
        label: {
          show: true,
          position: 'right',
          color: '#862633',
        },
      },
    ],
  }

  return options
}

export const getXBarOptions = getBarOptions
export const getYBarOptions = (args) => {
  const { data = [] } = args
  const { xData = [], yData = [] } = data2xyData(data)

  const options = {
    ...Cfg,
    xAxis: {
      type: 'category',
      data: xData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        // data: [120, 200, 150, 80, 70, 110, 130],
        data: yData,
        type: 'bar',
      },
    ],
  }

  return options
}
