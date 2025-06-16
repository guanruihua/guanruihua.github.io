import React, { RefObject, useEffect, useRef, useId } from "react"
import { ArrowProps } from './type'
import { dottedProps } from "./constant"

/**
 * @title 右箭头
 * @param props {ArrowProps}
 */
export function RightArrow(props: ArrowProps) {

	const { hidden, style = {}, render = true, dottedLine = false } = props
	if (hidden) return <></>;
	if (render === false) return <div className='right-arrow' style={style} />

	const ref: RefObject<HTMLDivElement> = useRef(null)
	const [size, setSize] = React.useState<number>(props.size || 100)

	const dProps = dottedLine ? dottedProps : {}
	useEffect(() => {
		if (!ref.current) return;
		const { width = 100 } = ref.current.getBoundingClientRect()
		if (width !== size) setSize(width)
	}, [ref.current])

	const id = useId()

	return <div className="right-arrow"
		ref={ref}
		style={{ height: '100%', width: '100%', ...style }}>
		{render && <svg viewBox={`0 0 ${size} 12`}>
			<defs>
				<marker id={"arrow" + id} markerWidth="10" markerHeight="6" refX="2" refY="3" orient="auto">
					<path d="M0,0 L0,6 L9,3 z" fill="currentColor" />
				</marker>
			</defs>
			<path d={`M0,6 ${size - 12},6`} stroke="currentColor" strokeWidth="2" fill="none" markerEnd={`url(#arrow${id})`} {...dProps} />
		</svg>}
	</div>
}

/**
 * @title 下箭头
 * @param props {ArrowProps}
 */
export function BottomArrow(props: ArrowProps) {
	const { hidden = false, style = {}, render = true, dottedLine = false } = props
	if (hidden) return <></>;
	if (render === false) return <div className='bottom-arrow' style={style} />

	const ref: RefObject<HTMLDivElement> = useRef(null)
	const [h, setH] = React.useState<number>(props.size || 0)
	const dProps = dottedLine ? dottedProps : {}

	useEffect(() => {
		if (!ref.current) return;
		const { height = 30 } = ref.current.getBoundingClientRect()
		if (height !== h) setH(height)
	}, [ref.current])

	const id = useId()

	return <div className='bottom-arrow' ref={ref} style={{ height: '100%', width: '100%', ...style }}>
		{render && <svg width="12" height="100%" viewBox={`0 0 12 ${h}`} xmlns="http://www.w3.org/2000/svg">
			<defs>
				<marker id={"arrow" + id} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
					<path d="M0,0 L10,5 L0,10" fill="currentColor" />
				</marker>
			</defs>
			<path d={`M6,0 V${h - 8}`} stroke="currentColor" strokeWidth="2" markerEnd={`url(#arrow${id})`} {...dProps} />
		</svg>}
	</div>
}
