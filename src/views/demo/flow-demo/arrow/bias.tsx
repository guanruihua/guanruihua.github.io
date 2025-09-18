import React, { RefObject, useEffect, useRef } from "react"
import { ArrowProps } from './type'
import { dottedProps } from "./constant"

export function BottomRightArrow(props: ArrowProps) {
	const { hidden, style = {}, render = true, floatStartScale = 0, floatEndScale = 0, dottedLine = false } = props
	if (hidden) return <></>;
	if (render === false) return <div className='bottom-right-arrow' style={style} />

	const ref: RefObject<HTMLDivElement> = useRef(null)
	const [h, setH] = React.useState<number>(props.size || 30)
	const [w, setW] = React.useState<number>(30)
	const [viewBox, setVB] = React.useState<string>(`0 0 0 0`)

	useEffect(() => {
		if (!ref.current) return;
		const { height, width } = ref.current.getBoundingClientRect()
		if (height && width && (width > 0 && width !== w)) {
			setVB(`0 0 ${width} ${height}`)
			width !== w && setW(width)
			height !== h && setH(height)
		}
	}, [ref.current])
	const dProps = dottedLine ? dottedProps : {}

	const ceil = (w * w + h * h) ** (1 / 2)
	const x = w / ceil
	const y = h / ceil

	const start = `${(w / -10) * floatStartScale},${(h / -10) * floatStartScale}`
	const end = `${w - x - (w / 10) * (floatEndScale)},${h - y - (h / 10) * (floatEndScale)}`

	return <div
		key={viewBox}
		className='bottom-right-arrow'
		ref={ref}
		style={{ height: '100%', width: '100%', ...style }}>
		{render && <svg width="100%" height="100%" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
			<defs>
				<marker id={"arrow"} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
					<path d="M0,0 L10,5 L0,10" fill="currentColor" />
				</marker>
			</defs>
			<path d={`M${start} L${end}`} stroke="currentColor" strokeWidth="2"
				markerEnd={`url(#arrow)`}
				{...dProps} />
		</svg>}
	</div>
}