import React from 'react'
import './index.less'
import { useHook } from './hook'
import { Tag } from './component'
import { classNames } from 'harpe'

export function Note() {
  const h = useHook()

  return (
    <div className="container">
      <div className="query">
        <div className="tags">
          {h.originTree.map((item) => {
            const { name } = item
            const newTags = h.queryParams.tags || []
            const isSelect = newTags.includes(name)
            return (
              <div
                className={classNames({ isSelect })}
                key={name}
                onClick={() => {
                  h.setQueryParams({
                    tags: isSelect
                      ? newTags.filter((v) => v !== name)
                      : [...newTags, name]
                  })
                }}
              >
                {name}
              </div>
            )
          })}
        </div>
        <input
          value={h.queryParams.find}
          onChange={(e) => {
            h.setQueryParams({ find: e.target.value || '' })
          }}
        />
      </div>
      <div className="note">
        <Tag tree={h.tree} click={h.select} />
      </div>
    </div>
  )
}
