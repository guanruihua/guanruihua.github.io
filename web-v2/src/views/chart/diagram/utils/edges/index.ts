import { isArray } from 'asura-eye'
import type { Position, Node } from '../../type'
import type { ObjectType } from '0type'
import { getDefaultEdge } from './get-default-edges'

export * from './get-default-edges'

export const getEdges = (
  rootRef: React.RefObject<HTMLDivElement>,
  nodes: Node[],
) => {
  if (!rootRef.current || !isArray(nodes)) return []

  const RootRect = rootRef.current.getBoundingClientRect()
  const xOffset = RootRect.left
  const yOffset = RootRect.top
  const nodeConf: ObjectType<Node> = {}

  const nodeRect: ObjectType<DOMRect> = {}

  const getRect = (key: string): DOMRect => {
    if (nodeRect[key]) return nodeRect[key]

    const dom = document.querySelector(key)
    if (dom) {
      const rect = dom.getBoundingClientRect()
      if (rect) {
        nodeRect[key] = rect
        return rect
      }
    }
    return RootRect
  }

  const getPosition = (key: string): Position => {
    const s = getRect(key)
    return {
      rect: s,
      top: [-xOffset + s.left + s.width / 2, -yOffset + s.top],
      right: [-xOffset + s.right, -yOffset + s.top + s.height / 2],
      bottom: [-xOffset + s.left + s.width / 2, -yOffset + s.bottom],
      left: [-xOffset + s.left, -yOffset + s.top + s.height / 2],
    }
  }

  const getAgentSvg = (startConf: Node, endConf: Node) => {
    const Start: Position = getPosition(
      `.d-node-handle[data-id="${startConf.id}"][data-type="${endConf.dataType}"]`,
    )

    const End: Position = getPosition(`.d-node[data-id="${endConf.id}"]`)
    // console.log("🚀 ~ getAgentSvg ~ End:", End)
    const x1 = Start.bottom[0]
    const y1 = Start.bottom[1]

    const x2 = End.top[0]
    const y2 = End.top[1]

    const dy = (Math.abs(y2 - y1) * 3) / 5
    const dx = ((x2 - x1) * 2) / 5

    return {
      className: 'hidden-arrow dash-flow reverse-flow',
      d: `M ${x1} ${y1} C ${x1 + dx} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${
        y2 - 8
      }`,
    }
  }

  const getSvg = (start: string, end: string) => {
    let x1 = 0
    let y1 = 0
    let x2 = 0
    let y2 = 0
    const Start: Position = getPosition(`.d-node[data-id="${start}"]`)
    const End: Position = getPosition(`.d-node[data-id="${end}"]`)

    if (Math.abs(Start.rect.top - End.rect.top) < 3) {
      x1 = Start.right[0]
      y1 = Start.right[1]

      x2 = End.left[0]
      y2 = End.left[1]
    } else {
      x1 = Start.bottom[0]
      y1 = Start.bottom[1]

      x2 = End.top[0]
      y2 = End.top[1]
    }

    if (Math.abs(y1 - y2) < 1) {
      return {
        d: `M ${x1} ${y1} ${x2 - 8} ${y2}`,
      }
    }

    const dy = (Math.abs(y2 - y1) * 3) / 5
    const dx = ((x2 - x1) * 2) / 5

    return {
      d: `M ${x1} ${y1} C ${x1 + dx} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${
        y2 - 8
      }`,
    }
  }

  nodes.forEach((node: Node) => {
    nodeConf[node.id] = node
  })

  const edges = getDefaultEdge(nodes).map((item) => {
    const startConf = nodeConf[item.start]
    const endConf = nodeConf[item.end]
    if (startConf.dataType === 'agent' && endConf.dataType) {
      return { ...item, ...getAgentSvg(startConf, endConf) }
    }
    return { ...item, ...getSvg(item.start, item.end) }
  })
  // console.log('🚀 ~ getEdges ~ edges:', edges)

  return edges
}
