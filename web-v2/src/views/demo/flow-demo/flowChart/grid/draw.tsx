import { isEffectArray, isEmpty, isString, isUndefined } from 'asura-eye'
import { type FlowChartProps } from '../type'

const baseStyle = `position: absolute;transform-origin: 0 0; overflow: visible;width: 100%;`

function is(a: number, b: number, float = 1) {
	return Math.abs(a - b) < float
}

export function draw(props: FlowChartProps) {
	const { name, nodes = [] } = props

	const id = 'au-flow-chart-' + name

	const content = document.querySelector(`.${id}`)
	if (isEmpty(content) || !isEffectArray(nodes)) return;

	const contentRecord = content.getBoundingClientRect()
	const { x: cx, y: cy } = contentRecord

	const db: Record<string, DOMRect> = {}

	const links: { form: string, to: string }[] = []
	nodes.forEach((item) => {
		const { id: cid, link } = item

		if (isEmpty(cid)) return;

		if (isString(link)) links.push({ form: cid, to: link })
		if (isEffectArray(link)) link.forEach(li => links.push({ form: cid, to: li }))

		const unit = document.querySelector(`.${id}>.au-flow-chart-item-${cid}`)
		if (isEmpty(unit)) return;
		const record = unit.getBoundingClientRect()
		db[cid] = record
	})


	function writeLine(form: string, to: string) {

		const { left: fl, right: fr, x: fx, y: fy, width: fw, height: fh } = db[form] || {}
		const { left: tl, right: tr, x: tx, y: ty, width: tw, height: th } = db[to] || {}

		if (isUndefined(fl) || isUndefined(tl)) return;

		const lineClass = `.arrow-${name}-${form}-${to}`
		const unit = document.querySelector(lineClass)
		const svg = document.querySelector(`${lineClass}>svg`)
		const path = document.querySelector(`${lineClass}>svg>path`)

		if (!unit || !svg || !path) return;

		if (Math.abs(fw - tw) > 1) {

			// 上
			if ((fr > tr || is(fr, tr)) && fy > ty && Math.abs(fx - tx) > 1) {

				let x = fx - cx - 6 + fw / 2 - tw / 2
				const y = fy - cy
				const newWidth = fy - ty - th
				const newHeight = 12
				if (fw !== tw && fw > tw) x = tx - cx - 6 + tw / 2

				const newStyle = `position: absolute;transform-origin: 0 0;`
					+ `width:${newWidth}px;`
					+ `height: ${newHeight}px;`
					+ `left:${x}px;`
					+ `top:${y}px;`
					+ `transform: rotate(-90deg);`

				unit.setAttribute('style', newStyle)
				svg.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`)
				path.setAttribute('d', `M0,6 ${newWidth},${newHeight / 2}`)
				return;
			}

			// 下
			if (fy < ty && fx !== tx && (fr > tr || is(fr, tr))) {
				let x = fx - cx + 6 + fw / 2
				const y = fy - cy + fh
				const newWidth = ty - fy - fh
				const newHeight = 12
				if (fw !== tw && fw > tw) x = tx - cx + 6 + tw / 2
				const newStyle = `position: absolute;transform-origin: 0 0;`
					+ `width:${newWidth}px;`
					+ `height: ${newHeight}px;`
					+ `left:${x}px;`
					+ `top:${y}px;`
					+ `transform: rotate(90deg);`

				unit.setAttribute('style', newStyle)
				svg.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`)
				path.setAttribute('d', `M0,6 ${newWidth},${newHeight / 2}`)
				return;
			}
		}


		/** 上 start **/

		if (is(fx, tx) && fy > ty) {

			let x = fx - cx - 6 + fw / 2
			const y = fy - cy
			const newWidth = fy - ty - th
			const newHeight = 12
			if (fw !== tw && fw > tw) x = tx - cx - 6 + tw / 2

			const newStyle = `position: absolute;transform-origin: 0 0;`
				+ `width:${newWidth}px;`
				+ `height: ${newHeight}px;`
				+ `left:${x}px;`
				+ `top:${y}px;`
				+ `transform: rotate(-90deg);`


			unit.setAttribute('style', newStyle)
			svg.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`)
			path.setAttribute('d', `M0,6 ${newWidth},${newHeight / 2}`)
			return;
		}

		/** 上 end **/

		// 右上
		if (fx < tx && fy > ty) {
			const x = fr - cx
			const y = fy - cy - 6
			const newHeight = 12
			const newStyle = baseStyle
				+ `height: ${newHeight}px;`
				+ `left:${x}px;`
				+ `top:${y}px;`
				+ `transform: rotateX(180deg);`

			unit.setAttribute('style', newStyle)
			svg.removeAttribute('viewBox')
			path.setAttribute('d', `M0,-6 ${tl - fr},${fy - ty - th - 6}`)
			return;
		}

		// 水平  右边 
		if (is(fy, ty) && fx < tx) {
			const x = fr - cx
			const y = fy + (fh / 2) - 6 - cy
			const newWidth = tl - fr
			const newHeight = 12
			const newStyle = `position: absolute;transform-origin: 0 0;`
				+ `width:${newWidth}px;`
				+ `height: ${newHeight}px;`
				+ `left:${x}px;`
				+ `top:${y}px;`

			unit.setAttribute('style', newStyle)
			svg.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`)
			path.setAttribute('d', `M0,6 ${newWidth},${newHeight / 2}`)
			return;
		}



		// 右下
		if (fx < tx && fy < ty) {
			const x = fx - cx + fw
			const y = fy - cy + fh - 6
			const newHeight = 12
			const newStyle = `position: absolute;transform-origin: 0 0;`
				+ `width: 100%;`
				+ `height: ${newHeight}px;`
				+ `left:${x}px;`
				+ `top:${y}px;`

			unit.setAttribute('style', newStyle)
			svg.removeAttribute('viewBox')
			path.setAttribute('d', `M0,6 ${tl - fr},${ty - fy - fh + 6}`)
			return;
		}

		/** 下 start **/
		if (is(fx, tx) && fy < ty) {
			let x = fx - cx + 6 + fw / 2
			const y = fy - cy + fh
			const newWidth = ty - fy - fh
			const newHeight = 12
			if (fw !== tw && fw > tw) x = tx - cx + 6 + tw / 2
			const newStyle = `position: absolute;transform-origin: 0 0;`
				+ `width:${newWidth}px;`
				+ `height: ${newHeight}px;`
				+ `left:${x}px;`
				+ `top:${y}px;`
				+ `transform: rotate(90deg);`

			unit.setAttribute('style', newStyle)
			svg.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`)
			path.setAttribute('d', `M0,6 ${newWidth},${newHeight / 2}`)
			return;
		}
		/** 下 end **/

		// 左下
		if (fx > tx && fy < ty) {
			const x = fx - cx
			const y = fy - cy + fh - 6
			const newHeight = 12
			const newStyle = `position: absolute;transform-origin: 0 0;`
				+ `width: 100%;`
				+ `height: ${newHeight}px;`
				+ `left:${x}px;`
				+ `top:${y}px;`

			unit.setAttribute('style', newStyle)
			svg.removeAttribute('viewBox')
			path.setAttribute('d', `M0,6 ${tr - fl},${ty - fy - fh + 6}`)
			return;
		}

		// 水平  左边
		if (is(fy, ty) && fx > tx) {
			const x = fx - cx
			const y = fy + (fh / 2) + 6 - cy
			const newWidth = fl - tr
			const newHeight = 12
			const newStyle = `position: absolute;transform-origin: 0 0;`
				+ `width:${newWidth}px;`
				+ `height: ${newHeight}px;`
				+ `left:${x}px;`
				+ `top:${y}px;`
				+ `transform: rotate(180deg);`

			unit.setAttribute('style', newStyle)
			svg.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`)
			path.setAttribute('d', `M0,6 ${newWidth},${newHeight / 2}`)
			return;
		}


		// 左上
		if (fx > tx && fy > ty) {
			const x = fl - cx
			const y = fy - cy - 6
			const newHeight = 12
			const newStyle = baseStyle
				+ `height: ${newHeight}px;`
				+ `left:${x}px;`
				+ `top:${y}px;`
				+ `transform: rotateX(180deg);`

			unit.setAttribute('style', newStyle)
			svg.removeAttribute('viewBox')
			path.setAttribute('d', `M0,-6 ${tl - fl + tw},${fy - ty - th - 6}`)
			return;
		}
	}


	links.forEach((link) => {
		const { form, to } = link
		writeLine(form, to)
	})

}