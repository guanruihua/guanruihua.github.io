import React from 'react'
import { Grid } from 'aurad'
import './index.less'

export function Tmp({
  draw,
  children,
}: {
  draw(dom: CanvasRenderingContext2D): void
  children?: React.ReactNode
}) {
  const ref = React.useRef<HTMLCanvasElement>(null)

  const init = () => {
    if (!ref.current) return
    const dom: HTMLCanvasElement = ref.current
    const cxt = dom?.getContext('2d')
    if (!cxt) return
    draw?.(cxt)
  }
  React.useEffect(() => {
    init()
  }, [])

  return (
    <Grid>
      <canvas
        ref={ref}
        width={300}
        height={240}
        style={{
          borderRadius: 4,
          background: 'rgba(255,255,255,1)',
        }}
      ></canvas>
      {children}
    </Grid>
  )
}