import React from 'react'
import { ObjectType } from 'abandonjs'

export interface TagProps {
  tree: any[]
  root?: string
  path?: string
  params?: ObjectType
  click?: (root: string, path: string) => void
}

export function Tag(props: TagProps) {
  const { tree, root = '', path = '', click } = props
  return (
    <div>
      {tree.map((item: any, index: number) => {
        const { name, children } = item
        const newRoot = root || name
        const newPath = path + '/' + name
        return (
          <div className="item" key={name + index}>
            <div
              className="name"
              onClick={() =>
                click &&
                (!children || !children.length) &&
                click(newRoot, newPath)
              }
            >
              {name}
            </div>
            {item.children && (
              <div className="next">
                <Tag
                  path={newPath}
                  root={newRoot}
                  tree={children}
                  click={click}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
