import React, { forwardRef } from 'react'
import { classNames } from 'harpe'

import { Handle } from './Handle'
import { Remove } from './Remove'
import { Conf } from '../type'
import { Input } from 'aurad'
import { UniqueIdentifier } from '@dnd-kit/core'

export interface ContainerProps {
  children: React.ReactNode
  columns?: number
  label?: string
  id?: UniqueIdentifier
  style?: React.CSSProperties
  horizontal?: boolean
  hover?: boolean
  handleProps?: React.HTMLAttributes<any>
  scrollable?: boolean
  shadow?: boolean
  placeholder?: boolean
  unstyled?: boolean
  onClick?(): void
  onRemove?(): void
  conf: Conf
  setConf(conf: Conf): void
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      id,
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      conf,
      setConf,
      ...props
    }: ContainerProps,
    ref,
  ) => {
    const Component = onClick ? 'button' : 'div'
    const [text, setText] = React.useState(label ?? '')
    const [editStatus, setEditStatus] = React.useState(false)
    // console.log(props, id)

    return (
      <Component
        {...props}
        ref={ref as any}
        style={
          {
            ...style,
            '--columns': columns,
          } as React.CSSProperties
        }
        className={classNames(
          'Container',
          unstyled && 'unstyled',
          horizontal && 'horizontal',
          hover && 'hover',
          placeholder && 'placeholder',
          scrollable && 'scrollable',
          shadow && 'shadow',
        )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div
            className={'Header'}
            onDoubleClick={() => {
              setEditStatus(true)
            }}
          >
            {editStatus ? (
              <Input
                value={text}
                onBlur={() => {
                  setEditStatus(false)
                  id && setConf({ [id]: { label: text } })
                }}
                onChange={(e: any) => {
                  setText(e.target.value)
                }}
              />
            ) : (
              <span>{label}</span>
            )}
            <div className={'Actions'}>
              {onRemove ? <Remove onClick={onRemove} /> : undefined}
              <Handle {...handleProps} />
            </div>
          </div>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
      </Component>
    )
  },
)
