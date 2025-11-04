import { data } from './data'

// console.log(data)

export const getOptions = () => {
  return {
    grid3D: {},
    tooltip: {},
    xAxis3D: {
      type: 'category',
    },
    yAxis3D: {
      type: 'category',
    },
    zAxis3D: {},
    visualMap: {
      max: 1e8,
      dimension: 'Population',
    },
    dataset: {
      dimensions: [
        'Income',
        'Life Expectancy',
        'Population',
        'Country',
        { name: 'Year', type: 'ordinal' },
      ],
      source: data,
    },
    series: [
      {
        type: 'bar3D',
        // symbolSize: symbolSize,
        shading: 'lambert',
        encode: {
          x: 'Year',
          y: 'Country',
          z: 'Life Expectancy',
          tooltip: [0, 1, 2, 3, 4],
        },
      },
    ],
  }
}
