import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  // verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// 可拖拽的单个项目组件
const SortableItem = ({ id, value }: { id: string; value: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  }

  return (
    <div
      className="dnd-item"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {value}
    </div>
  )
}

export const DndBox = () => {
  const [items, setItems] = useState([
    { id: '1', value: 'Item 1' },
    { id: '2', value: 'Item 2' },
    { id: '3', value: 'Item 3' },
    { id: '4', value: 'Item 4' },
    { id: '5', value: 'Item 5' },
    { id: '6', value: 'Item 6' },
    { id: '7', value: 'Item 7' },
    { id: '8', value: 'Item 8' },
    { id: '9', value: 'Item 9' },
  ])

  // 配置传感器（支持鼠标/触摸/键盘拖拽）
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // 拖拽结束时的处理
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    console.log(active, over)
    // 如果拖拽到列表外（如空白区域），则取消
    if (!over) return

    // 限制只能移动到前 3 个位置（按需调整条件）
    const maxIndex = 3 // 例如最多拖到第 3 项之后
    const newIndex = items.findIndex((item) => item.id === over.id)
    if (newIndex > maxIndex) return

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="dnd-box">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items}
          // strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <SortableItem key={item.id} {...item} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
