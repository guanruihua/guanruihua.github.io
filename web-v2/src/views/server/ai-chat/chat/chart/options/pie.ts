import { isArray } from 'asura-eye'
import { Args } from '../type'
import { t } from '../../i18n'
import { legend } from './conf'
import { ObjectType } from '0type'

export const getPieOptions = (args: Args) => {
  const { title, lang = 'en_US', data = [] } = args
  const selected:ObjectType = {}
  if (isArray(data) && data.length > 10) {
    const top10 = data
      .slice()
      .sort((a: any, b: any) => b - a)
      .slice(0, 10)
      .map(item => item.name)

    data.forEach(({ name }) => {
      selected[name] = top10.includes(name)
    })
  }

  return {
    tooltip: { trigger: 'item' },

    legend,
    graphic: {
      type: 'text',
      left: 'center',
      top: 'center',
      style: {
        // text: '总数',
        text:
          t(lang, 'total') + '\n\n' + data.reduce((n, i) => (n += i.value), 0),
        textAlign: 'center',
        fill: '#333',
        width: 30,
        height: 30,
        fontSize: 14,
      },
    },
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['30%', '49%'],
        // avoidLabelOverlap: false,
        avoidLabelOverlap: true,
        minShowLabelAngle: 5,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        // data: [
        //   { name: 'AppPulse+', value: 25 },
        //   // ...
        // ],
        data,
      },
    ],
  }
}
