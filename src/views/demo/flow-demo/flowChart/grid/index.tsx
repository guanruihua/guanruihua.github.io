import React, { useEffect } from 'react'
import { isEffectArray, isEmpty, isNumber, isString } from 'asura-eye'
import { classNames } from 'harpe'
import { debounce } from 'abandonjs'
import { type FlowGridChartProps } from '../type'
import { draw } from './draw'
import './index.less'

export function FlowGridChart(props: FlowGridChartProps) {

  const {
    name, nodeWidth,
    dottedProps = { strokeDasharray: "5 5", strokeDashoffset: "5" },
    nodes = [], count = 4, className, columnGap = 80, rowGap = 30,
    style = {}, ...rest
  } = props

  const getGridTemplateColumns = () => {
    let flag = 'auto'
    if (isString(nodeWidth)) {
      flag = nodeWidth
      if (nodeWidth === 'auto') flag = 'auto'
      if (nodeWidth === 'equal') flag = '1fr'
    }
    if (isNumber(nodeWidth)) flag = nodeWidth + 'px'
    return new Array(count).fill(flag).join(' ')
  }

  const newStyle = {
    gridTemplateColumns: getGridTemplateColumns(),
    gap: `0 ${columnGap}px`,
    ...style
  }
  const id = 'au-flow-chart-' + name

  useEffect(() => {

    draw(props)

    const content = document.querySelector(`.${id}`)

    const observer = new ResizeObserver(debounce(() => {
      draw(props)
    }, 50));
    if (!content) return;
    observer.observe(content);
    return () => {
      observer.unobserve(content)
    }

  }, [nodes.length, props])


  return (
    <div
      className={classNames('au-flow-chart', id, className)}
      style={newStyle}
      {...rest}>

      {nodes.map((node, index: number) => {

        const {
          span = 1, label, align = 'center', style = {}, status = 'prohibit',
          id, link, dottedLine = false, series = {}
        } = node

        if (span === 0) style['display'] = 'none'
        if (span > 1) style['gridColumn'] = `auto / ${span} span`
        if (align === 'start') style['justifyContent'] = 'start'
        if (align === 'end') style['justifyContent'] = 'end'

        const links: { form: string, to: string }[] = []

        if (!isEmpty(id)) {
          if (isString(link)) links.push({ form: id, to: link })
          if (isEffectArray(link)) link.forEach(li => links.push({ form: id, to: li }))
        }
        const labelShow = label && id

        return (<React.Fragment key={index}>
          <div className={classNames({
            [`au-flow-chart-item-${id}`]: id,
            'au-flow-chart-item-label': labelShow,
            [`au-flow-chart-status-${status}`]: labelShow,
          })} style={{ marginBottom: rowGap, ...style }}>{label}</div>

          {links.map((item, index: number) => {
            const { form, to } = item

            const { dottedLine: showDottedLine = dottedLine, lineStyle = {} } = series[to] || {}
            const markerId = `${name}-${form}-${to}`
            let pathProps = {
              d: `M0,6 88,6`,
              stroke: "currentColor",
              strokeWidth: "2",
              fill: "none",
              markerEnd: `url(#arrow${markerId})`,
            }

            if (showDottedLine) {
              pathProps = { ...pathProps, ...dottedProps }
            }

            return <div
              style={{ position: 'absolute', width: 0 }}
              className={classNames(
                `arrow-${name}-${form}-${to}`,
                { [`au-flow-link-status-${status}`]: labelShow, }
              )}
              key={`${form}-${to}` + index}
            >
              <svg
                style={{ width: '100%', overflow: 'visible', ...lineStyle }} >
                <defs>
                  <marker id={`arrow${markerId}`} markerWidth="10" markerHeight="6" refX="8" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
                  </marker>
                </defs>
                <path {...pathProps} />
              </svg>
            </div>
          })}
        </React.Fragment>)
      })}

    </div >
  );
}