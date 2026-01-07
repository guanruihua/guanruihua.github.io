import React from 'react'
import { Div } from 'aurad'
import { ClassNameType } from 'harpe'
import './index.less'

export interface ContainerProps {
  className?: ClassNameType
  containerClassName?: ClassNameType
  style?: React.CSSProperties
  [key: string]: any
}

export function Container(props: ContainerProps) {
  const { children, containerClassName, className, style, ...rest } =
    props

  return (
    <Div
      className={[
        'layout-container',
        location.hash.replace('#/', '').replace('/', '__'),
        containerClassName,
      ]}
    >
      <Div className={['layout-box', className]} style={style} {...rest}>
        {children}
      </Div>
    </Div>
  )
}
