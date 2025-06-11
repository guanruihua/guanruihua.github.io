import React from 'react'
import { Header } from '../header'
import './index.less'
import { Div } from 'aurad'
import { ClassNameType } from 'harpe'

export interface ContainerProps {
  header?: React.ReactNode
  className?: ClassNameType
  containerClassName?: ClassNameType
  style?: React.CSSProperties
  [key: string]: any
}

export function Container(props: ContainerProps) {
  const { children, header, containerClassName, className, style, ...rest } =
    props

  return (
    <Div
      className={[
        'layout-container',
        location.hash.replace('#/', '').replace('/', '__'),
        containerClassName,
      ]}
    >
      <Header>{header}</Header>
      <Div className={['layout-box', className]} style={style} {...rest}>
        {children}
      </Div>
    </Div>
  )
}
