import { PageState, Edge, DataStatus } from '../type'
import { classNames } from 'harpe'

export interface DiaGramEdgeProps {
  state: PageState
}
export const DiaGramEdge = (props: DiaGramEdgeProps) => {
  const { state } = props
  const arrowheads = [
    ['arrowhead', '#c2c8d5'],
    ['arrowhead-hover', 'red'],
    ['arrowhead-success', '#3da463'],
    ['arrowhead-error', '#ea6872'],
    ['arrowhead-warning', '#fab355'],
  ]

  const getStatus = (edge: Edge): DataStatus => {
    const { id, start, end } = edge
    if (state?.status?.[id]) return state.status[id]

    const s = state?.status?.[start] ?? 'default'
    const e = state?.status?.[end] ?? 'default'
    if([s, e].includes('default')) return 'default'
    // if([s, e].includes('idle')) return 'idle'
    if([s, e].includes('error')) return 'error'
    return 'default'
  }

  return (
    <svg className="dev__diagram-edge-container">
      <defs>
        {arrowheads.map(([id, color]) => (
          <marker
            key={id}
            id={id}
            markerWidth="3.5"
            markerHeight="2.5"
            refX="1"
            refY="1.25"
            orient="auto"
          >
            <path d="M0,0 L2.5,1.25 L0,2.5 Z" fill={color} />
          </marker>
        ))}
      </defs>
      {state?.edges.map((edge: Edge) => {
        const { id, d, className } = edge
        return (
          <path
            key={id}
            className={classNames('d-edge', className)}
            data-status={getStatus(edge)}
            d={d}
            fill="none"
            onMouseOver={() => {
              console.log('hover', id)
            }}
          />
        )
      })}
    </svg>
  )
}
