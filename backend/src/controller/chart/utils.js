import { isEffectObject } from 'asura-eye'

import { getBarOptions, getXBarOptions, getYBarOptions } from './options/bar.js'
import { getPieOptions } from './options/pie.js'
import { getLineOptions } from './options/line.js'
import { getLinesOptions } from './options/lines.js'

function randomNum(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const toChartOptions = (toolType, args = {}) => {
  const { title } = args
  let options = {}
  if (toolType === 'draw_chart:any_Chart') {
    args.title = 'Radom Data Title'
    args.data = new Array(4).fill('').map((item, i) => ({
      name: 'Item-' + (i + 1),
      value: randomNum(30, 300),
    }))
    options = getBarOptions(args)
  }
  if (toolType === 'draw_chart:bar') options = getBarOptions(args)
  if (toolType === 'draw_chart:x_bar') options = getXBarOptions(args)
  if (toolType === 'draw_chart:y_bar') options = getYBarOptions(args)
  if (toolType === 'draw_chart:pie') options = getPieOptions(args)
  if (toolType === 'draw_chart:line') options = getLineOptions(args)
  if (toolType === 'draw_chart:lines') options = getLinesOptions(args)

  if (isEffectObject(options)) {
    if (title) {
      options.title = {
        text: title,
        left: 'center',
      }
    }
    return options
  }

  return undefined
}
