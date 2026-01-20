import React from 'react'
import { usePageState } from './state'
import './index.less'
import { Edge, Node, PageState } from '../component'
import { isNumber } from 'asura-eye'

interface DateNodeProps {
  node: Node
  state: PageState
  layout: PageState
}
// const LabelNode = (props: DateNodeProps) => {
//   const { node, state, layout } = props
//   const { id, label } = node
//   const { width = 'auto', height = 'auto' } =
//     layout?.Rect?.[id] || ({} as DOMRect)
//   const [x, y] = layout?.XY?.[id] || []

//   return (
//     <div
//       className="d-label-box"
//       style={{
//         width,
//         height,
//         transform:
//           isNumber(x) && isNumber(y) ? `translate(${x}px, ${y}px)` : undefined,
//       }}
//     >
//       <div
//         className="d-label"
//         data-id={id}
//         data-status={state?.status?.[id] ?? 'default'}
//       >
//         {label ?? id}
//       </div>
//     </div>
//   )
// }
const DateNode = (props: DateNodeProps) => {
  const { node, state, layout } = props
  const { id, label, type = 'default' } = node
  const { width = 'auto', height = 'auto' } =
    layout?.Rect?.[id] || ({} as DOMRect)
  const [x, y] = layout?.XY?.[id] || []
  return (
    <div
      className="d-node-box"
      style={{
        width,
        height,
        transform:
          isNumber(x) && isNumber(y) ? `translate(${x}px, ${y}px)` : undefined,
      }}
    >
      <div
        className="d-node"
        data-id={id}
        data-type={type}
        data-status={state?.status?.[id] ?? 'default'}
      >
        {label ?? id}
      </div>
    </div>
  )
}

// export default function Chart_Mermaid_Flowchart() {
export default function () {
  const { rootRef, state, layout } = usePageState()

  return (
    <div className="animation__mermaid-flowchart">
      <div className="animation__mermaid-flowchart-container" ref={rootRef}>
        <svg className="animation__mermaid-flowchart-edge-box">
          {state.edges?.map((edge: Edge, i: number) => {
            const { id } = edge
            // console.log(edge)
            return (
              <path data-id={id} key={i} fill="none" d={layout.EdgeD?.[id]} />
            )
          })}
        </svg>
        <div className="animation__mermaid-flowchart-node-box">
          {state.nodes.map((node: Node, i: number) => {
            return (
              <DateNode key={i} node={node} state={state} layout={layout} />
            )
          })}
          {/* {state.edges.filter(_=>_.label).map((edge, i: number)=>{
            return 
          })} */}
        </div>
      </div>
    </div>
  )
}
