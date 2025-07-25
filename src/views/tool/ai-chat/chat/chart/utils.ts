import { isEffectObject } from 'asura-eye'
import { ObjectType } from '../type'

import { getBarOptions, getXBarOptions, getYBarOptions } from './options/bar'
import { getPieOptions } from './options/pie'
import { getLineOptions } from './options/line'
import { getLinesOptions } from './options/lines'

export const toChartOptions = (
  toolType: string,
  args: ObjectType = {},
): ObjectType | undefined => {
  const { title } = args
  let options: ObjectType = {}
  if (toolType === 'draw_bar_chart') options = getBarOptions(args)
  if (toolType === 'draw_x_bar_chart') options = getXBarOptions(args)
  if (toolType === 'draw_y_bar_chart') options = getYBarOptions(args)
  if (toolType === 'draw_pie_chart') options = getPieOptions(args)
  if (toolType === 'draw_line_chart') options = getLineOptions(args)
  if (toolType === 'draw_lines_chart') options = getLinesOptions(args)

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
