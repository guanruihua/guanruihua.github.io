import React from 'react'
import { isNumber } from 'asura-eye'
import { Icon } from './icon'
import { Div } from 'aurad'
import { Node, PageState } from './type'
import { DiagramHandle } from './diagram-handle'
import { rowGap, unit } from './conf'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  item: Node
  state: PageState
}

export const DiagramNode = (props: Props) => {
  const { state, item, style, ...rest } = props
  const {
    id,
    type = 'default',
    label = '',
    nextLabel = '',
    x = 0,
    y = 0,
    row,
  } = item
  const top = isNumber(row) ? row * rowGap : y * unit
  const X = x * unit + 10
  const Y = top + 30

  return (
    <div
      className={'d-node'}
      data-id={id}
      data-type={type}
      data-status={state?.status?.[id] ?? 'default'}
      style={{
        // transform,
        transform: `translate(${X}px, ${Y}px)`,
        ...style,
      }}
      {...rest}
    >
      {Icon.includes(type) && <Icon type={type} />}
      {label && (
        <Div className="d-node-label-container">
          <Div className="label">{label}</Div>
          <Div className="next-label" none={!nextLabel}>
            {nextLabel}
          </Div>
        </Div>
      )}
      <DiagramHandle id={id} type={type} />
    </div>
  )
}
