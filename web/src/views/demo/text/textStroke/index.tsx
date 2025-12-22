import React from 'react'
import { classNames, ClassNameType } from 'harpe'
import './index.less'
import { ObjectType } from '0type'
import { useSetState } from '0hook'
import { isNumber, isString } from 'asura-eye'

export interface TextStrokeProps extends ObjectType {
  width?: number
  height?: number
  className?: ClassNameType
  style?: React.CSSProperties
  property?: {
    text?: {
      className?: string
      style?: React.CSSProperties
    } & ObjectType
  }
  /**
   * @default #000
   */
  color?: string
  /**
   * @default 15
   */
  fontSize?: number
  /**
   * @default 1
   */
  strokeWidth?: number
  /**
   * @default '#108ee9'
   */
  stroke?: string
  children: string
}

export function TextStroke(props: TextStrokeProps) {
  const {
    color = '#fff',
    fontSize = 15,
    strokeWidth = 2,
    stroke = '#108ee9',
    children,
    className,
    style,
    property,
    ...rest
  } = props

  const textRef = React.useRef<SVGTextElement>(null)
  const [state, setState] = useSetState({
    overflow: false,
    overflowChildren: '',
    width: 0,
    height: 0
  })
  React.useEffect(() => {
    if (!textRef.current) return
    const { width, height } = textRef.current.getBoundingClientRect()
    const getWidth = () => {
      if (rest?.width) return rest.width
      if (style?.width) {
        if (isNumber(style.width)) return style.width
        if (isString(style.width) && style.width.includes('px'))
          return Number(style.width.replace('px', ''))
      }
      return
    }
    const contentWidth: number | undefined = getWidth()
    if (contentWidth && contentWidth < width) {
      const unit = width / children.length
      setState({
        overflow: true,
        overflowChildren:
          children.slice(0, Math.ceil(contentWidth / unit) - 3) + '...',
        width: rest.width,
        height: height
      })
    } else
      setState({
        overflow: false,
        width: width + strokeWidth,
        height: height
      })
  }, [textRef])

  return (
    <svg
      className={classNames('au-text-stroke', className)}
      style={style}
      xmlns='http://www.w3.org/2000/svg'
      width={state.width}
      height={state.height}
      {...rest}>
      <text
        fill={color}
        ref={textRef}
        x={strokeWidth}
        y='0'
        alignmentBaseline='text-before-edge'
        textAnchor='start'
        style={{
          fontSize,
          strokeWidth,
          stroke
        }}
        {...property?.text}>
        {state.overflow ? state.overflowChildren : children}
      </text>
      {/* {state.overflow && (
        <text
          fill={color}
          ref={textRef}
          x={state.width}
          y='0'
          alignmentBaseline='text-before-edge'
          textAnchor='end'
          style={{
            position: 'absolute',
            right: 0,
            fontSize,
            strokeWidth,
            stroke: 'red'
          }}
          {...property?.text}>
          ...
        </text>
      )} */}
    </svg>
  )
}
