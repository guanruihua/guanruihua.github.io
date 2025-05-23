import React, { forwardRef, HTMLAttributes } from 'react'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { classNames } from 'harpe'

// import { removeIcon } from './icons'
import { ObjectType } from '0type'
// import styles from './Page.module.css';
const styles: ObjectType<string> = {}
export const removeIcon = (
  <svg
    width="10"
    height="10"
    viewBox="0 0 22 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.99998 -0.000206962C2.7441 -0.000206962 2.48794 0.0972617 2.29294 0.292762L0.292945 2.29276C-0.0980552 2.68376 -0.0980552 3.31682 0.292945 3.70682L7.58591 10.9998L0.292945 18.2928C-0.0980552 18.6838 -0.0980552 19.3168 0.292945 19.7068L2.29294 21.7068C2.68394 22.0978 3.31701 22.0978 3.70701 21.7068L11 14.4139L18.2929 21.7068C18.6829 22.0978 19.317 22.0978 19.707 21.7068L21.707 19.7068C22.098 19.3158 22.098 18.6828 21.707 18.2928L14.414 10.9998L21.707 3.70682C22.098 3.31682 22.098 2.68276 21.707 2.29276L19.707 0.292762C19.316 -0.0982383 18.6829 -0.0982383 18.2929 0.292762L11 7.58573L3.70701 0.292762C3.51151 0.0972617 3.25585 -0.000206962 2.99998 -0.000206962Z" />
  </svg>
)

export enum Position {
  Before = -1,
  After = 1,
}

export enum Layout {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  Grid = 'grid',
}

export interface Props extends Omit<HTMLAttributes<HTMLButtonElement>, 'id'> {
  active?: boolean
  clone?: boolean
  insertPosition?: Position
  id: UniqueIdentifier
  index?: number
  layout: Layout
  onRemove?(): void
}

export const Page = forwardRef<HTMLLIElement, Props>(function Page(
  {
    id,
    index,
    active,
    clone,
    insertPosition,
    layout,
    onRemove,
    style,
    ...props
  },
  ref,
) {
  return (
    <li
      className={classNames(
        styles.Wrapper,
        active && styles.active,
        clone && styles.clone,
        insertPosition === Position.Before && styles.insertBefore,
        insertPosition === Position.After && styles.insertAfter,
        layout === Layout.Vertical && styles.vertical,
      )}
      style={style}
      ref={ref}
    >
      <button className={styles.Page} data-id={id.toString()} {...props} />
      {!active && onRemove ? (
        <button className={styles.Remove} onClick={onRemove}>
          {removeIcon}
        </button>
      ) : null}
      {index != null ? (
        <span className={styles.PageNumber}>{index}</span>
      ) : null}
    </li>
  )
})
