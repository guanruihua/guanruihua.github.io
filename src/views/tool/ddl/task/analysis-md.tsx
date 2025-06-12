interface Item {
  name: string
  type: string
  next: string[]
}
export const analysisMD = (md: string): any[] => {
  const data: Item[] = [
    {
      name: '',
      type: 'Own',
      next: [],
    },
  ]
  // const list = md.split('\r\n').filter(Boolean)
  const list = md.split(/\r\n|\n|\r/).filter(Boolean)
  const reg = /^- \[.*?\]\(.*?\)/
  let type = 'Own'
  // console.log(md, list)

  list.forEach((row: string) => {
    const tmp: Item = data.at(-1) as Item
    if (row.indexOf('## ') === 0) {
      type = row.replace('## ', '')
      return
    }

    if (row.indexOf('### ') === 0) {
      const name = row.replace('### ', '')
      if (tmp.name) {
        data.push({
          name,
          type,
          next: [],
        })
      } else {
        tmp.name = name
        tmp.type = type
      }
      return
    }

    if (row.indexOf('- ') == 0) {
      // tmp?.next.push(row.replace(/^- \[|\)$/gi, '').split(']('))
      tmp?.next.push(row.replace(/^- /g, ''))
    }
  })

  return data
}
