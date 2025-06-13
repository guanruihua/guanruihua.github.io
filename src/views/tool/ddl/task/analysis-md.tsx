import { isArray, isEffectObject, isObject } from 'asura-eye'
import { getUID } from './util'

export interface Item {
  id: string
  name: string
  next?: {
    [key: string]: Item[]
  }
}
export const analysisMD = (md: string): any[] => {
  const list = md.split(/\r\n|\n|\r/).filter(Boolean)

  const db: Item[] = []
  let nextId: string = ''

  for (let i = 0; i < list.length; i++) {
    const row: string = list[i]
    if (row.indexOf('# ') === 0) {
      const name = row.replace('# ', '').trim()
      const id = getUID(name)
      nextId = ''
      db.push({
        id,
        name,
        next: {},
      })
      continue
    }

    const lastItem: Item | undefined = db.at(-1)
    if (!isEffectObject<Item>(lastItem)) {
      continue
    }
    if (row.indexOf('## ') === 0) {
      const name = row.replace('## ', '').trim()
      const id = getUID(name)
      nextId = id

      if (isObject(lastItem?.next)) {
        lastItem.next[nextId] = []
      }
      continue
    }

    if (row.indexOf('- ') == 0) {
      const name = row.replace(/^- /g, '')
      const id = lastItem.id + '.' + nextId + '.' + getUID(name)

      if (isArray(lastItem?.next?.[nextId])) {
        lastItem.next[nextId].push({ name, id })
      }
      continue
    }
  }

  return db
}
