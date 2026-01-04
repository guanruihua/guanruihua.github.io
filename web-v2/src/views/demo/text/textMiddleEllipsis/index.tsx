import React from 'react'
import './index.less'
import { classNames, ClassNameType } from 'harpe'

export interface TextMiddleEllipsisProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'className' | 'children' | 'style'
  > {
  text?: string
  children?: string

  style?: React.CSSProperties
  className?: ClassNameType
  [key: string]: any
}

export function TextMiddleEllipsis(props: TextMiddleEllipsisProps) {
  const { className, text, children, ...rest } = props
  const renderTxt = text ?? children

  return (
    <div className={classNames('au-text-middle-ellipsis', className)} {...rest}>
      <span className='txt'>{renderTxt}</span>
      <span className='title' title={renderTxt}>
        {renderTxt}
      </span>
    </div>
  )
}
