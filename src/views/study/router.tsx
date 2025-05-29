import React from 'react'
import { ObjectType } from '0type'
import { isArray } from 'asura-eye'
import { conf } from './conf'

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
