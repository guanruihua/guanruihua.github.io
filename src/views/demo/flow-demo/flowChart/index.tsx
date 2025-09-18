import React from 'react'
import { type FlowChartProps } from './type'
import { FlowGridChart } from './grid'
export * from './type'

export function FlowChart(props: FlowChartProps) {
	const { type = 'grid', ...rest } = props
	if (type === 'grid') return <FlowGridChart {...rest} />
	return <FlowGridChart {...rest} />
} 