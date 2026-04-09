import { isEffectArray, isString } from 'asura-eye'
import PinyinMatch from 'pinyin-match'

const is = (a: any, find: any) => {
  if (!isString(a) || !isString(find)) return true
  const astr = a.trim().toLowerCase()
  const bstr = find.trim().toLowerCase()
  if (!astr || !bstr) return true
  if (astr.indexOf(bstr) > -1) return true
  if (PinyinMatch.match(astr, bstr) === false) {
    return false
  }
  return true
}

export const getCols = (
  guide: any[],
  search: string,
  selects: string[],
  colCount: number,
) => {
  const canRenderGuide = guide
    .filter((_) => {
      if (_.type && selects.length > 0) {
        return selects.includes(_.type)
      }
      return true
    })
    .map((_) => {
      _.show = is(_.name, search)

      if (isEffectArray(_.next)) {
        _.next = _.next.map((row) => {
          if (_.show) {
            row[2] = true
            return row
          }

          row[2] = is(row[0], search)
          return row
        })
        if (_.show === false) {
          const flag = _.next.find((row) => row[2])
          if (flag) _.show = true
        }
      }
      return _
    })
    .filter((_) => _.show)

  const cols = new Array(colCount).fill('').map((_, i) => {
    return canRenderGuide.filter((_: any, j) => j % colCount === i)
  })

  return {
    canRenderGuide,
    cols,
  }
}
