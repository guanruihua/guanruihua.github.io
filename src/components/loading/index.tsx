import { Div } from 'aurad'
import React from 'react'
import './index.less'

export interface LoadingProps {
  loading?: boolean
  children?: React.ReactNode
  [key: string]: any
}

export function Loading(props: LoadingProps) {
  const { loading = true, children, ...rest } = props
  return (
    <Div className="au-loading" classNames={{ loading }} {...rest}>
      {children}
      {loading && (
        <Div classNames="au-loading-bg">
          <Div classNames="au-loading-spin"></Div>
        </Div>
      )}
    </Div>
  )
}
