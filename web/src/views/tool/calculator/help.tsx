import { isNumber, isString, likeNumber } from 'asura-eye'

// [55/5*(1+6)]*(123+4)
// 55/5*7 = 77

const isEffectPart = (part: any): boolean => {
  if (isString(part) && part) {
    return likeNumber(part.at(0)) && likeNumber(part.at(-1))
  }
  return false
}

const getDivisionValue = (p: string): string => {
  let total: undefined | number = undefined
  const items = p.split(/(\d)/gi).filter(Boolean)
  let flag = '*'
  items.forEach((item, i) => {
    if (['*', '/', '**'].includes(item)) {
      flag = item
      return
    }
    const num = parseFloat(item)
    if (isNumber(num)) {
      if (!isNumber(total)) {
        total = num
        return
      }
      if (flag === '**') {
        total **= num
      }
      if (flag === '*') {
        total *= num
      }
      if (flag === '/') {
        total /= num
      }
      flag = '*'
      return
    }
  })
  return String(total || 0)
}


const getAddValue = (formula: string): string => {
  let total = 0
  const items = formula.split(/(\+|\-)/gi)

  let flag = '+'
  items.forEach((item, i) => {
    if (['+', '-'].includes(item)) {
      flag = item
      return
    }
    const num = parseFloat(item)
    if (isNumber(num)) {
      if (flag === '-') {
        total -= num
      }
      if (flag === '+') {
        total += num
      }
      flag = '+'
      return
    }
  })
  return String(total)
}

const getValue = (formula: string): string => {
  // \ ÷ * x **
  if (/\/|÷|\*|x/.test(formula)) {
    const parts = formula.split(/\+|-/gi)

    parts.forEach((part) => {
      if (isEffectPart(part) && isString(formula)) {
        if (/\*|x|\/|÷/.test(part)) {
          const val = getDivisionValue(part)
          formula = formula.replaceAll(part, val)
        }
      }
    })

  }

  // + -
  if (/\+|-/.test(formula)) {
    return getAddValue(formula)
  }
  return formula
}

function hasExactly(str: string, reg: any) {
  const count = (str.match(reg) || []).length || 0
  return count > 0
}

export const toResult = (formula?: string): string => {
  if (!formula) return '0'
  if (isNumber(formula)) formula = String(formula)
  if (isString(formula)) {
    if (formula.indexOf('x') > 0) formula = formula.replaceAll('x', '*')
    if (formula.indexOf('÷') > 0) formula = formula.replaceAll('÷', '/')

    formula = formula.trim()
  } else {
    return '0'
  }
  if (isNumber(Number(formula))) return formula
  let depth = 0

  const handle = (target: string) => {
    if (depth++ > 3000) return '0'
    let parts = target.split(/(\[|\]|\(|\))/).filter(Boolean)

    const set = (i: number) => {
      if (
        (parts[i - 1] === '(' && parts[i + 1] === ')') ||
        (parts[i - 1] === '[' && parts[i + 1] === ']')
      ) {
        parts[i - 1] = ''
        parts[i + 1] = ''
      }
    }

    parts.forEach((p, i) => {
      if (isEffectPart(p) && hasExactly(p, /\+|-|\*|\\/g)) {
        parts[i] = getValue(p)
        set(i)
      }
    })
    let res = parts.join('')
    if (
      (res.indexOf('(') > -1 && res.indexOf(')') > -1) ||
      (res.indexOf('[') > -1 && res.indexOf(']') > -1)
    ) {
      res = handle(res)
    }

    if (isEffectPart(res) && hasExactly(res, /\+|-|\*|\\/g)) {
      return getValue(res)
    }
    return res
  }

  const val = handle(formula)

  return val
}
