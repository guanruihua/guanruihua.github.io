import { type ObjectType } from 'abandonjs'
import { isEffectArray } from 'asura-eye'
import { handleLayout } from './layout'
import { type CircularProps } from '..'

export function draw(props: CircularProps) {
	const { name, links = [] } = props
	handleLayout(props)
	const contentDom: HTMLDivElement | null = document.querySelector(`.${name}`)
	const bgDom: SVGAElement | null = document.querySelector(`.${name}-bg`)
	if (!contentDom || !bgDom || !isEffectArray(links)) return;

	const { left: contentLeft, top: contentTop } = contentDom.getBoundingClientRect()

	const getBoundingClientRect = (id: string) => {
		const itemName = `${name}-${id}`
		const nodeDom: HTMLDivElement | null = document.querySelector(`.${itemName}`)
		if (!nodeDom) return
		const { left, top, width, height } = nodeDom.getBoundingClientRect()
		return [
			(left + width / 2) - contentLeft,
			(top + height / 2) - contentTop
		]
	}

	links.forEach((link) => {
		const { form = '', to = '' } = link
		const f = getBoundingClientRect(form as string)
		const t = getBoundingClientRect(to as string)
		if (!f || !t) return;
		const [fx, fy] = f
		const [tx, ty] = t
		const itemName = `${name}${form}-${to}-arrow`
		const dom = document.querySelector(`svg>.${itemName}`)
		if (!dom) return;
		dom.setAttribute('d', `M ${fx},${fy} ${tx},${ty}`)

	})

}