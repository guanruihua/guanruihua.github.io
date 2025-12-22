import { CSSProperties, ReactNode } from 'react'
import { ArrowProps } from '../arrow'
import { ClassNameType } from 'harpe'

export type FlowChartNodeStatus =
  | 'operable'
  | 'finish'
  | 'error'
  | 'prohibit'
  | 'empty'
export type FlowFloatCover = ArrowProps

export type FlowChartNode = {
  status?: FlowChartNodeStatus
  id?: string
  label?: string | ReactNode
  style?: CSSProperties
  link?: string | string[]
  width?: number

  /**
   * @description 水平对齐方式
   * @default 'center'
   */
  align?: 'center' | 'start' | 'end'
  /**
   * @description 水平方向占用单元格
   * @value 0 相当于 display: none;
   * @default 1
   */
  span?: number
  /**
   * @description 虚线
   * @default false
   */
  dottedLine?: boolean
  series?: {
    [link: string]: {
      dottedLine?: boolean
      lineStyle?: CSSProperties
    }
  }
}

export interface FlowChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'> {
  type?: 'grid' | 'rightWard'

  /**
   * @description 当前 流程图唯一标识
   */
  name: string
  /**
   * @description 列等宽
   * @default true
   */
  nodeWidth?: number | string | 'equal' | 'auto'
  /**
   * @description 每行节点数量
   * @default 4
   */
  count?: number
  columnGap?: number
  rowGap?: number
  /**
   * @description 虚线的样式 (连线的线体部分)
   * @default { strokeDasharray: "5 5", strokeDashoffset: "5" }
   */
  dottedProps?: {
    strokeDasharray?: string
    strokeDashoffset?: string
  }
  nodes: FlowChartNode[]
}

export interface FlowGridChartProps extends FlowChartProps {
  className?: ClassNameType
  type?: never
}
export interface FlowRightWardChartProps extends FlowChartProps {
  className?: ClassNameType
  type?: never
}
