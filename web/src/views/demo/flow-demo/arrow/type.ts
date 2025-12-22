export interface ArrowProps  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'> {

	hidden?: boolean
	size?: number
	/**
	 * @description 虚线
	 * @default false
	 */
	dottedLine?: boolean
	/**
	 * @description 是否渲染 svg 
	 * @default true
	 */
	render?: boolean
	/**
	 * @description 线段起始点修改浮动长度(比例), 越小越长
	 * @default 0
	 */
	floatStartScale?: number
	/**
	 * @description 线段终点修改浮动长度(比例), 越大越短
	 * @default 0
	 */
	floatEndScale?: number
}