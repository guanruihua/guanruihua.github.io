import React from 'react'
import { classNames } from 'harpe'
import { useSetState } from '0hook'
import { isArray } from 'asura-eye'

export interface TagProps {
  tree: any[]
  root?: string
  path?: string
  click?: (root: string, path: string) => void
  lv?: number
}

export function Tag(props: TagProps) {
  const { tree, root = '', path = '', lv = 0, click } = props

  const [nextStyle, setNextStyle] = useSetState<
    Record<string, React.CSSProperties>
  >({})

  return (
    <div
      className={classNames('tag', {
        isRoot: !root
      })}
    >
      {tree.map((item: any, index: number) => {
        const { name, children } = item
        const newRoot = root || name
        const newPath = path + '/' + name
        if (
          isArray(children) &&
          children.length === 1 &&
          children[0].name === 'index'
        ) {
          const newPath = path + '/' + name + '/index'
          return (
            <div className="item" key={name + index}>
              <div
                className={classNames('name', 'last')}
                onClick={() => {
                  click && click(newRoot, newPath)
                }}
              >
                {name}
              </div>
            </div>
          )
        }
        return (
          <div className="item" key={name + index}>
            <div
              className={classNames('name', {
                last: !children || !children.length
              })}
              style={{
                zIndex: 99999-lv
              }}
              onClick={() => {
                if (children && children.length) {
                  if (Object.keys(nextStyle[name] || {}).length) {
                    setNextStyle({ [name]: {} })
                  } else {
                    setNextStyle({ [name]: { display: 'none' } })
                  }
                } else {
                  click && click(newRoot, newPath)
                }
              }}
              title={name}
            >
              {name}
            </div>
            {item.children && (
              <div className={classNames('next')} style={nextStyle[name]}>
                <Tag
                  {...props}
                  path={newPath}
                  root={newRoot}
                  tree={children}
                  lv={lv + 1}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
