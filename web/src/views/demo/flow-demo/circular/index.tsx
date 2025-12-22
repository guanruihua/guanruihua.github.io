import React from 'react'
import { ObjectType, debounce } from 'abandonjs'
import { mock } from 'mock-record'
import { draw } from './core'
import { classNames } from 'harpe'

export type FlowNode = ObjectType & { id: string }
export type FlowLink = ObjectType & { form: string; to: string }

export interface CircularProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'> {
  name?: string
  style?: React.CSSProperties
  nodes: FlowNode[]
  nodeStyle?: React.CSSProperties
  nodeClick?(props: FlowNode): void
  links: FlowLink[]
  linkStyle?: React.CSSProperties
  linkClick?(props: FlowLink): void
}

export function Circular(props: CircularProps) {
  const {
    name = 'flow-circular-' + mock('@id'),
    style = {},
    nodeStyle = {},
    linkStyle = {},
    links = [],
    nodes = [],
    nodeClick,
    linkClick,
  } = props

  React.useEffect(() => {
    const content = document.querySelector(`.${name}`)
    const observer = new ResizeObserver(
      debounce(() => {
        draw({ name, links, nodes })
      }, 50),
    )
    if (!content) return
    observer.observe(content)
    return () => {
      observer.unobserve(content)
    }
  }, [])

  return (
    <div
      className={classNames(name)}
      style={{
        position: 'relative',
        width: '100%',
        background: 'transparent',
        overflow: 'hidden',
        ...style,
      }}>
      {nodes.map((item, index) => {
        const { id = '' } = item
        const itemName = `${name}-${id}`
        return (
          <div
            className={itemName}
            style={{
              display: 'inline-flex',
              position: 'absolute',
              cursor: 'pointer',
              zIndex: 10,
              justifyContent: 'center',
              alignItems: 'center',
              ...nodeStyle,
            }}
            onClick={() => {
              nodeClick && nodeClick(item)
            }}
            key={index}>
            {id as string}
          </div>
        )
      })}
      <svg
        className={`${name}-bg`}
        style={{
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}>
        {links.map((item, index) => {
          const { form, to } = item
          const itemName = `${name}${form}-${to}-arrow`
          return (
            <path
              style={{
                cursor: 'pointer',
                zIndex: 1,
                ...linkStyle,
              }}
              stroke='black'
              strokeWidth='3'
              onClick={() => {
                linkClick && linkClick(item)
              }}
              key={itemName + index}
              className={itemName}
              d='M 0,0 0,0'
            />
          )
        })}
      </svg>
    </div>
  )
}
