export const ChartParameters = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      // description: '图表的标题, 请根据上下文生成',
      description: 'The title of the chart, please generate it according to the context',
    },
    data: {
      type: 'array',
      description:
        'data is an array with two properties, one property is name, and the second property is value, which identifies the value of the item; The values of these two attributes are required',
      // description: 'data是个数组有两个属性, 一个属性是name, 第二个value, 标识该项的值; 这两个属性的值是必填的',
    },
  },
  required: ['title', 'data'],
}

export const ChartTools = [
  {
    type: 'function',
    function: {
      name: 'draw_chart:bar',
      // description: '绘制柱状图',
      description: 'Draw a bar chart',
      parameters: ChartParameters,
    },
  },
  // 用于低算力的ai上
  {
    type: 'function',
    function: {
      name: 'draw_chart:any_Chart',
      // description: '绘制柱状图',
      description: 'Draw a bar chart of random Data',
      parameters: {
        type: 'object',
        required: ['type'],
        properties: {
          type: {
            type: 'string',
            // description: '图表的标题, 请根据上下文生成',
            description: 'What kind of chart should be drawn',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'draw_chart:x_bar',
      description: '绘制水平柱状图',
      parameters: ChartParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'draw_chart:y_bar',
      description: '绘制垂直柱状图',
      parameters: ChartParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'draw_chart:pie',
      description: '绘制饼图',
      parameters: ChartParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'draw_chart:line',
      description: '绘制折线图',
      parameters: ChartParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'draw_chart:lines',
      description: '绘制多条折线图或者折线图堆叠',
      parameters: {
        type: 'object',
        description: '多条折线的配置',
        properties: {
          title: {
            type: 'string',
            description: '图表的标题, 请根据上下文生成',
          },
          // xData: {
          //   type: 'array',
          //   description: '图表的x坐标',
          // },
          data: {
            type: 'array',
            description: '每条数据条线的相关数据',
            properties: {
              name: {
                type: 'string',
                description: '名称',
              },
              data: {
                type: 'array',
                description: '单条数据条线的相关数据',
                properties: {
                  name: {
                    type: 'string',
                    description: '名称',
                  },
                  value: {
                    type: 'number',
                    description: '值',
                  },
                },
              },
              // value: {
              //   type: 'array',
              //   description: '值; 数字数组',
              // },
            },
          },
        },
        required: ['title', 'data'],
      },
    },
  },
]

// export * from './utils'
