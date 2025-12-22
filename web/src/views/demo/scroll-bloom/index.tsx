import React, { useRef } from 'react'
import './index.less'
import { Div } from 'aurad'

export default function () {
  const ref = useRef<HTMLDivElement>(null)
  const [row, setRow] = React.useState(0)

  React.useEffect(() => {
    function watch_scroll(e: any = {}) {
      const { height } = window.document.body.getBoundingClientRect()
      const h = e?.target?.scrollTop || 0
      const r = Math.ceil((h + height) / 230)
      if (r !== row) setRow(r)
    }
    watch_scroll()
    if (!ref.current) return

    ref.current?.removeEventListener('scroll', watch_scroll)
    ref.current.addEventListener('scroll', watch_scroll)
    // console.log(ref.current)
    return () => {
      ref.current?.removeEventListener('scroll', watch_scroll)
    }
  }, [ref.current])

  return (
    <div className="scroll-bloom">
      <div className="container" ref={ref}>
        {new Array(130).fill('').map((_, i) => (
          <Div
            key={i}
            className={[
              'box',
              {
                active: Math.ceil((i + 1) / 3) <= row,
              },
            ]}
          >
            {i + 1}
          </Div>
        ))}
      </div>
    </div>
  )
}
