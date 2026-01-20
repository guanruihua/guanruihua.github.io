import React from 'react'
import { Edge, Node, PageState } from '../../component'
import { getRect } from './utils'

export const genLayout = async (
  state: PageState,
  rootDom: React.RefObject<HTMLDivElement>,
): Promise<PageState> => {
  const rootRect = rootDom?.current?.getBoundingClientRect()
  const newState: PageState = {
    rootRect,
    Rect: {},
    Size: {},
    XY: {},
    EdgeD: {},
  }

  state.nodes.forEach((node: Node) => {
    const { id } = node
    const rect = getRect(`.d-node[data-id="${id}"]`)
    newState.Rect[id] = rect
  })

  const gap = 120
  const yGap = 30
  const { height } = rootRect

  const handle = (id: string, x: number = 0) => {
    // console.log('🚀 ~ handle ~ id:', id, x)

    if (!id) return

    const { width } = newState.Rect[id]

    const next = state.Next?.[id]
    if (!next) return
    const len = next.length
    if (len === 1) {
      const rect = newState.Rect[id]
      const nid = next[0]
      newState.XY[nid] = [x + gap, (height - rect.height) / 2]
      handle(nid, x + width + gap)
    } else if (len > 1) {
      let totalHeight = 0
      let maxWidth = 0

      const Heights: number[] = next.map((id: string, i: number) => {
        const rect = newState.Rect[id]
        totalHeight += (i + 1 === len ? 0 : yGap) + rect.height
        if (maxWidth < rect.width) maxWidth = rect.width
        return rect.height
      })

      next?.forEach((nid, i) => {
        newState.XY[nid] = [
          x + gap,
          (height - totalHeight) / 2 +
            yGap * i +
            Heights.slice(0, i).reduce((total = 0, num) => total + num, 0),
        ]
        handle(nid, x + maxWidth + gap)
      })
      // console.log('🚀 ~ handle ~ maxWidth:', maxWidth)
    }

    return next
  }
  const id = state.nodes.at(0).id
  const rect = newState.Rect[id]
  const xy: [number, number] = [40, (height - rect.height) / 2]
  newState.XY[id] = xy
  handle(id, xy[0] + rect.width)

  newState.EdgeD = {}

  const getXY = (edge: Edge) => {
    const { start, end } = edge
    const [x1, y1] = newState.XY[start]
    const r1 = newState.Rect[start]
    const [x2, y2] = newState.XY[end]
    const r2 = newState.Rect[start]

    return {
      x1: x1 + r1.width,
      y1: y1 + r1.height / 2,
      x2,
      y2: y2 + r2.height / 2,
    }
  }

  state.edges?.forEach((edge: Edge) => {
    const { id } = edge
    const { x1, y1, x2, y2 } = getXY(edge)

    if (Math.abs(y1 - y2) < 3) {
      newState.EdgeD[id] = `M ${x1} ${y1}, ${x2} ${y2}`
    } else {
      const dy = (Math.abs(y2 - y1) * 4) / 5
      const dx = ((x2 - x1) * 3) / 5
      let d = ''

      if (y1 > y2) {
        d = `M ${x1} ${y1} C ${x1 + dx} ${y1 - dy}, ${
          x2 - dx
        } ${y2}, ${x2} ${y2}`
      }else{
        d = `M ${x1} ${y1} C ${x1 + dx} ${y1 + dy}, ${
          x2 - dx
        } ${y2}, ${x2} ${y2}`
      }

      newState.EdgeD[id] = d
    }
  })
  // console.log(newState)

  return newState
}
