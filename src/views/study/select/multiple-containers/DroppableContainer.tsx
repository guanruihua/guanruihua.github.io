import React from 'react'
import { UniqueIdentifier } from '@dnd-kit/core'
import {
  AnimateLayoutChanges,
  useSortable,
  defaultAnimateLayoutChanges,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Container, ContainerProps } from './components'
import { Conf } from './type'

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true })

export function DroppableContainer({
  children,
  columns = 1,
  disabled,
  id,
  items,
  style,
  ...props
}: ContainerProps & {
  disabled?: boolean
  id: UniqueIdentifier
  items: UniqueIdentifier[]
  conf: Conf
  setConf(conf: Conf): void
  style?: React.CSSProperties
}) {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id,
    data: {
      type: 'container',
      children: items,
    },
    animateLayoutChanges,
  })
  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== 'container') ||
      items.includes(over.id)
    : false

  return (
    <Container
      id={id}
      ref={disabled ? undefined : setNodeRef}
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
      }}
      hover={isOverContainer}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      columns={columns}
      {...props}
    >
      {children}
    </Container>
  )
}
