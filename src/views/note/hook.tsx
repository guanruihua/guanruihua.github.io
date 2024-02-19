import React from 'react'
import { get } from '@/util'
import { isArray } from 'asura-eye'
import { ObjectType } from 'abandonjs'

export const useHook = () => {

  const [queryParams, setQueryParams] = React.useState<ObjectType>({})

  const [url, setUrl] = React.useState(
    'https://ruihuag-note.github.io/Back-End/index.html#/C%E8%AF%AD%E8%A8%80/C++/C++basic'
  )
  const [tree, setTree] = React.useState<any[]>([])
  const init = async () => {
    const res = await get(
      'https://cdn.jsdelivr.net/npm/ruihuag-note/sidebar.json'
    )
    const { path } = res.data || {}
    if (isArray<any>(path)) {
      setTree(path.filter((_: any) => !_.name.match(/^(\.|_)/)))
    }
  }

  const select = (root: string, path: string) => {
    if (!root || !path) return
    const newUrl = `https://ruihuag-note.github.io/${root}/index.html#${path.replace(
      '/' + root,
      ''
    )}`
    window.open(newUrl)
    // setUrl(newUrl)
  }

  React.useEffect(() => {
    init()
  }, [])

  return {
    queryParams,
    setQueryParams,
    url,
    setUrl,
    tree,
    setTree,
    select
  }
}
