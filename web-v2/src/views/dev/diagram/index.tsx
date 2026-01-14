import './style/index.less'
import './style/d-node.less'
import './style/d-node-handle.less'
import './style/d-edge.less'

import { Node } from './type'
import { workflow } from './conf'
import { usePageState } from './state'
import { DiagramDialog, DiaGramEdge, DiagramNode } from './component'

export default function Dev_Diagram() {
  const { rootRef, state, setState } = usePageState({
    // nodes,
    nodes: workflow,
  })

  return (
    <div className="dev__diagram" ref={rootRef}>
      <DiaGramEdge state={state} />
      <div className="dev__diagram-node-container">
        {state.nodes.map((item: Node, i) => (
          <DiagramNode
            key={i}
            item={item}
            state={state}
            onClick={() => {
              console.log(item)
              setState({
                dialog: {
                  open: true,
                  node: item,
                },
              })
            }}
          />
        ))}
      </div>
      <DiagramDialog key={JSON.stringify(state.dialog)} state={state} setState={setState} />
    </div>
  )
}
