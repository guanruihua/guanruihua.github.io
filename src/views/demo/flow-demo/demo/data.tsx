import React from 'react'
import { FlowChartNode } from '../flowChart'

export const nodes: FlowChartNode[] = [
	{
		id: '-1', label: <h2>标题1</h2>, status: 'empty',
		span: 5, align: 'start'
	},

	{ id: '1', label: 'Node 1', link: ['2', '7', '8'], status: 'operable', dottedLine: true, },
	{ id: '2', label: 'Node 2', status: 'error', link: ['3', '4', '5'], },
	{ id: '3', label: 'node 3', status: 'finish', width: 200, link: ['6', '10', '33'], },
	{},
	{ id: '33', label: 'node 33', status: 'finish', width: 200, },

	{},
	{ id: '4', label: 'Node 4', link: ['8', '5', '10'], },
	{ id: '5', label: 'Node 5', link: '6' },
	{ id: '6', label: 'Node 6' },
	{},

	{ id: '7', label: 'Node 7', link: '8' },
	{ id: '8', label: 'Node 8', link: '9' },
	{ id: '9', label: 'Node 9', link: '10' },
	{ id: '10', label: 'Node 10', link: '11' },

	{ id: '11', label: 'Node 11' },

	{ id: '-2', span: 5, label: <h2>标题2</h2>, status: 'empty', align: 'start' },

	{ id: '12', label: 'Node 12', span: 2, link: ['7', '8', '17', '18'], status: 'error' },
	{ id: '14', label: 'Node 14', link: ['16', '9'] },
	{},
	{ id: '16', label: 'Node 16' },
	{ id: '17', label: 'Node 17' },
	{ id: '18', label: 'Node 18', link: ['19'] },
	{
		id: '19', label: 'Node 19',
		status: 'operable',
		link: ['4', '18', '14', '8', '11', '10', '20', '24', '25', '30', '23', '28'],
		series: { '11': { dottedLine: true } }
	},
	{ id: '20', label: 'Node 20 Node 20 Node 20 Node 20 ' },
	{ id: '21', label: 'Node 21' },

	{ id: '22', label: 'Node 22' },
	{ id: '23', label: 'Node 23' },
	{ id: '24', label: 'Node 24' },
	{ id: '25', label: 'Node 25 Node 20 de 20 Node 20' },
	{ id: '26', label: 'Node 26' },

	{ id: '27', label: 'Node 27' },
	{ id: '28', label: 'Node 28' },
	{ id: '29', label: 'Node 29' },
	{ id: '30', label: 'Node 30', span: 2 },
	{
		id: '31', label: 'Node 31', span: 5, status: 'finish',
		link: [
			'27', '28', '29', '30',
			'32', '333', '34', '35'
		]
	},
	{ id: '32', label: 'Node 32' },
	{ id: '333', label: 'Node 333', span: 2 },
	{ id: '34', label: 'Node 34' },
	{ id: '35', label: 'Node 35' },
]