import { Leafer, Rect, PointerEvent } from 'leafer-ui'

export const demo0 = (leafer: Leafer) => {
  const rect = new Rect({
    tag: 'rect-1',
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    fill: '#32cd79',
    cornerRadius: [50, 80, 0, 80],
    draggable: true,
  })
  rect.on(PointerEvent.CLICK, () => {
    console.log('click')
  })

  leafer.add(rect)
}