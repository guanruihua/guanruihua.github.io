import { ToolType } from '../type'

export const ChartParameters = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: '图表的标题, 请根据上下文生成',
    },
    data: {
      type: 'array',
      description:
        'data是个数组有两个属性, 一个属性是name, 第二个value, 标识该项的值',
    },
  },
  required: ['title', 'data'],
}

export const ChartTools: ToolType[] = [
  {
    type: 'function',
    function: {
      name: 'draw_bar_chart',
      description: '绘制柱状图',
      parameters: ChartParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'draw_x_bar_chart',
      description: '绘制水平柱状图',
      parameters: ChartParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'draw_y_bar_chart',
      description: '绘制垂直柱状图',
      parameters: ChartParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'draw_pie_chart',
      description: '绘制饼图',
      parameters: ChartParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'draw_line_chart',
      description: '绘制折线图',
      parameters: ChartParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'draw_lines_chart',
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

export const OwnChartToolTypes: string[] = ChartTools.map(
  item => item.function.name,
)

export * from './utils'
