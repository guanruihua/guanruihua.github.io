import React from 'react'
import { ObjectType } from '0type'
import { isArray } from 'asura-eye'
import { Lazy } from 'aurad'

const conf: {
  group?: string
  label?: string
  path: string
  name: string
  element: React.ReactNode | any
}[] = [
  {
    group: 'css',
    path: 'css-q-quotes',
    name: '双引号样式',
    element: Lazy(import('./quotes')),
  },
  {
    group: 'css',
    path: 'css-flex',
    name: 'CSS flex',
    element: Lazy(import('./css-flex')),
  },
  {
    group: 'css',
    path: 'css-grid',
    name: 'grid',
    element: Lazy(import('./css-grid')),
  },
  {
    group: 'demo',
    path: 'font-stroke',
    name: '字体描边',
    element: Lazy(import('./font-stroke')),
  },
]

export const StudyChildRouter: {
  path: string
  name: string
  element: React.ReactNode
}[] = []

export const TREE: ObjectType<{ label: string; child: any[] }> = {
  css: {
    label: 'CSS',
    child: [],
  },
  demo: {
    label: '示例',
    child: [],
  },
  other: {
    label: 'Other',
    child: [],
  },
}

conf.forEach((item) => {
  const { group = 'other', label, path, name, element } = item

  if (isArray(TREE[group].child)) {
    TREE[group].child.push({
      label: label || name,
      path: path,
    })
  } else {
    TREE.other.child.push({
      label: label || name,
      path: path,
    })
  }
  StudyChildRouter.push({ path, name, element })
})
