import { ObjectType } from "abandonjs";
import { CircularProps } from "..";

export function handleLayout(props: CircularProps) {
	const { name, nodes = [] } = props

	const contentDom: HTMLDivElement | null = document.querySelector(`.${name}`)
	if (!contentDom || nodes.length === 0) return {};
	const len = nodes.length
	const radiusLength = 15 * len
	const { width: contentWidth } = contentDom.getBoundingClientRect()
	const contentOriginStyle = contentDom.getAttribute('style') || ''


	const centerOfCircle = [radiusLength, radiusLength]
	let maxHeight = radiusLength * 2

	nodes.map((item: ObjectType, index: number) => {
		const { id } = item
		const itemName = `${name}-${id}`
		const nodeDom: HTMLDivElement | null = document.querySelector(`.${itemName}`)
		if (!nodeDom) return;
		const boundingClientRect = nodeDom?.getBoundingClientRect()
		const { width: itemWith } = boundingClientRect
		const itemOriginStyle = nodeDom.getAttribute('style') || ''
		let x = 0;
		let y = 0;

		if (index === 0) {
			centerOfCircle[0] = (contentWidth - itemWith) / 2
		}
		const angle = 2 * Math.PI * (index / len)
		x = Math.sin(angle) * radiusLength + centerOfCircle[0]
		y = - Math.cos(angle) * radiusLength + centerOfCircle[1]
		if (y > maxHeight) maxHeight = y
		nodeDom.setAttribute('style', `${itemOriginStyle}left: ${x}px; top: ${y}px;`)
		contentDom.setAttribute('style', `${contentOriginStyle} height: ${maxHeight + 80}px;`)

	})


}