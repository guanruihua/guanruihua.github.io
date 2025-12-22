import React from 'react'
import { ObjectType } from '0type'
import { echarts } from './core'
import { classNames } from 'harpe'
import { debounce } from 'abandonjs'

export type ChartProps = {
  className?: string
  options: ObjectType
  init?: (chart: any) => void
  [key: string]: any
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'>

export function Chart(props: ChartProps) {
  const { className, style, options, init, ...rest } = props
  const chartDom = React.useRef<HTMLDivElement>(null)
  let myChart: any

  React.useEffect(() => {
    if (!chartDom.current) return

    try {
      // console.log(echarts, chartDom, options)
      if (chartDom) {
        //判断是否已存在实例
        myChart = echarts.getInstanceByDom(chartDom.current)
        if (!myChart) {
          myChart = echarts.init(chartDom.current)
        }
        //回传实例
        if (init) init(myChart)

        myChart.setOption(options)
        const resize = debounce(function () {
          myChart.resize()
        }, 100)

        window.addEventListener('resize', resize)
        return () => {
          window.removeEventListener('resize', resize)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, [options, chartDom.current])

  return (
    <div
      className={classNames(className)}
      ref={chartDom}
      style={{
        height: '100%',
        width: '100%',
        ...style,
      }}
      {...rest}
    />
  )
}