import { ObjectType } from '0type'
import { Conf } from './constant'
import { isString } from 'asura-eye'

const getRandom = (min: number, max?: number) => {
  if (max) Math.floor(Math.random() * (max - min + 1) + min)
  return Math.floor(Math.random() * min)
}

function shuffle(str: string) {
  const arr = str.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // 生成随机索引
    ;[arr[i], arr[j]] = [arr[j], arr[i]] // 交换位置
  }
  return arr.join('')
}

export const getStr = (conf: ObjectType) => {
  const {
    min = 1,
    max = 32,
    number,
    letter,
    LETTER,
    symbol,
    include,
    exclude,
  } = conf
  const Tmp: string[] = []
  if (number) Tmp.push(Conf.number)
  if (letter) Tmp.push(Conf.letter)
  if (LETTER) Tmp.push(Conf.LETTER)
  if (symbol) Tmp.push(Conf.symbol)

  let Seed: string = Tmp.join('')
  if (isString(exclude) && exclude.length) {
    Seed = Seed.split('')
      .filter((c) => !exclude.includes(c))
      .join('')
  }
  const getChar = () => {
    const i = getRandom(Seed.length)
    const match: string = Seed.at(i) || ''
    if (match) {
      const j = Math.floor(Math.random() * match.length)
      return match[j]
    }
    return ''
  }
  const rangeNum = getRandom(min, max)
  const num = rangeNum > min ? rangeNum : min
  let res = new Array(num).fill('').map(getChar).join('')

  if (isString(include) && include.length) {
    res = shuffle(res.slice(include.length) + include)
  }

  return res
}

export const getNow = () => new Date().getTime()
