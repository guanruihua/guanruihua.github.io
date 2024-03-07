import React from 'react'
import { get } from '@/util'
import { isArray } from 'asura-eye'
import { useSetState } from '0hook'
import { ObjectType, stringify } from 'abandonjs'

const key = '__cache_queryParams__'

const filterTree = (tree: any[], params: ObjectType): any[] => {
  const { find = '', tags = [] } = params as any
  const newFind: string = (find as string).toUpperCase()

  const filterTreeCore = (list: any[], lv = 0) => {
    const newList: any[] = []
    list.forEach((item) => {
      const { name, children, content = '' } = item
      const newName = name.toUpperCase()
      const newContent = name.toUpperCase()
      const newItem = { ...item }

      // if (lv === 0) {
      //   console.log(tags, name)
      // }
      if (lv === 0 && tags.length && !tags.includes(name)) {
        return
      }

      if (newFind && stringify(item).toUpperCase().indexOf(newFind) === -1) {
        return
      }
      if (children && children.length) {
        newItem.children = filterTreeCore(newItem.children, lv + 1)
        newList.push(newItem)
        return
      }
      if (
        newFind &&
        (newName.indexOf(newFind) === -1 ||
          (newContent && newContent.indexOf(newFind) === -1))
      ) {
        return
      }
      newList.push(newItem)
    })
    return newList
  }
  return filterTreeCore(tree)
}

export const useHook = () => {
  const [queryParams, _setQueryParams] = useSetState<{
    find: string
    tags: string[]
  }>({
    find: '',
    tags: ['CSS', 'JavaScript', 'HTML', 'React', 'vue', 'Data', 'TypeScript']
    // tags: []
  })
  const [originTree, setOriginTree] = React.useState<any[]>([])
  const [tree, setTree] = React.useState<any[]>([])
  const [maxTree, setMaxTree] = React.useState<any[]>([])
  const setQueryParams = (record: { find?: string; tags?: string[] }) => {
    const newRecord = { ...queryParams, ...record }
    _setQueryParams(newRecord)
    localStorage.setItem(key, stringify(newRecord))
    if (maxTree.length) {
      setTree(filterTree(maxTree, newRecord))
    } else {
      setTree(filterTree(originTree, newRecord))
    }
  }

  const select = (root: string, path: string) => {
    if (!root || !path) return
    const newUrl = `https://ruihuag-note.github.io/${root}/index.html#${path.replace(
      '/' + root,
      ''
    )}`
    window.open(newUrl)
  }

  const init = async () => {
    const initMax = (res: any) => {
      if (res.data && isArray(res.data.path)) {
        setMaxTree(res.data.path)
      }
    }
    get('https://unpkg.com/ruihuag-note/sidebar.all.json').then(
      initMax
    )
    get('https://cdn.jsdelivr.net/npm/ruihuag-note/sidebar.all.json').then(
      initMax
    )
    const init = (res: any) => {
      const { path } = res.data || {}
      const params = localStorage.getItem(key)
      if (isArray<any>(path)) {
        const newPath = path.filter((_: any) => !_.name.match(/^(\.|_)/))
        setOriginTree(newPath)
        if (params) {
          const newParams = JSON.parse(params)
          _setQueryParams(newParams)
          setTree(filterTree(newPath, newParams))
        } else {
          setTree(filterTree(newPath, queryParams))
        }
      }
    }
    get('https://unpkg.com/ruihuag-note/sidebar.json').then(init)
    get('https://cdn.jsdelivr.net/npm/ruihuag-note/sidebar.json').then(init)
  }
  React.useEffect(() => {
    init()
  }, [])

  return {
    queryParams,
    setQueryParams,
    tree,
    originTree,
    setTree,
    select
  }
}
