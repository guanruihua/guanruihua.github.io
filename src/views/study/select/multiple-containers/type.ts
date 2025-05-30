import React from 'react'
import {
  CancelDrop,
  Modifiers,
  UniqueIdentifier,
  KeyboardCoordinateGetter,
} from '@dnd-kit/core'
import { SortingStrategy } from '@dnd-kit/sortable'
import { ObjectType } from '0type'

export type Items = Record<UniqueIdentifier, UniqueIdentifier[]>
export type Conf = ObjectType<
  {
    label: string
  } & ObjectType
>
export interface Props {
  adjustScale?: boolean
  cancelDrop?: CancelDrop
  columns?: number
  containerStyle?: React.CSSProperties
  coordinateGetter?: KeyboardCoordinateGetter
  getItemStyles?(args: {
    value: UniqueIdentifier
    index: number
    overIndex: number
    isDragging: boolean
    containerId: UniqueIdentifier
    isSorting: boolean
    isDragOverlay: boolean
  }): React.CSSProperties
  wrapperStyle?(args: { index: number }): React.CSSProperties

  conf: Conf
  setConf(conf: Conf): void
  items: Items
  setItems(items: Items | ((items: Items) => Items)): void

  handle?: boolean
  renderItem?: any
  strategy?: SortingStrategy
  modifiers?: Modifiers
  minimal?: boolean
  trashable?: boolean
  scrollable?: boolean
  vertical?: boolean
}
