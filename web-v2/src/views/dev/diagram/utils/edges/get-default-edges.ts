import { isObject, isString } from 'asura-eye'
import type { Node, Edge } from '../../type'

export const getEdge = (node: Node): Edge[] => {
  const edges = []

  const genEdges = (id: string, to: string, type: string = 'default') => {
    if (!id || !isString(to)) return
    const tos = to.split(',')
    tos.forEach((to) => {
      const start = id
      const end = to
      edges.push({ id: `${id}-${to}`, start, end, type })
    })
  }

  const { id, to, edge } = node
  if (!id) return

  if (isString(to)) genEdges(id, to)

  if (isString(edge)) genEdges(id, edge)

  if (isObject(edge)) {
    for (const key in edge) {
      const value = edge[key]
      if (!isString(value)) continue
      genEdges(id, value, key)
    }
  }
  return edges
}

export const getDefaultEdge = (nodes: Node[]): Edge[] => {
  const edges = []

  const genEdges = (id: string, to: string, type: string = 'default') => {
    if (!id || !isString(to)) return
    const tos = to.split(',')
    tos.forEach((to) => {
      const start = id
      const end = to
      edges.push({ id: `${id}-${to}`, start, end, type })
    })
  }

  nodes.forEach((node: Node) => {
    const { id, to, edge } = node
    if (!id) return

    if (isString(to)) return genEdges(id, to)

    if (isString(edge)) return genEdges(id, edge)

    if (isObject(edge)) {
      for (const key in edge) {
        const value = edge[key]
        if (!isString(value)) continue
        genEdges(id, value, key)
      }
    }
  })
  return edges
}
