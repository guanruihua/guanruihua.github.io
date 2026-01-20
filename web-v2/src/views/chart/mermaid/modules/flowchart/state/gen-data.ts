import { Node, PageState } from '../../component'

export const genData = async (nodes: Node[]) => {
  const newState: PageState = {
    nodes: [],
    edges: [],
    Next: {},
  }

  nodes.forEach((node: Node, i: number) => {
    const { edges } = node

    if (!node.id) node.id = `__node_${i}`
    newState.nodes.push(node)

    edges?.forEach((edge) => {
      if (!edge.start) edge.start = node.id
      if (!edge.id) edge.id = `__edge__${edge.start}-${edge.end}`
      newState.edges.push(edge)

      if (!newState.Next[node.id]) newState.Next[node.id] = []
      newState.Next[node.id].push(edge.end)
    })
  })

  return newState
}
