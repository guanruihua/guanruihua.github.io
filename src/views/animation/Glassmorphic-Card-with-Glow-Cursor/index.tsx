import React from 'react'
import './index.less'

export default function () {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!ref.current) return

    const card = ref.current

    function mousemove(e: any) {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      card.style.setProperty('--x', `${x}px`)
      card.style.setProperty('--y', `${y}px`)

      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * 10
      const rotateY = ((x - centerX) / centerX) * -10

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      const angle = 135 + rotateX - rotateY
      card.style.setProperty('--angle', `${angle}deg`)
    }

    function mouseleave() {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`
      card.style.setProperty('--angle', `135deg`)
    }

    card.removeEventListener('mousemove', mousemove)
    card.removeEventListener('mouseleave', mouseleave)

    card.addEventListener('mousemove', mousemove, { passive: true })
    card.addEventListener('mouseleave', mouseleave)

    return () => {
      card.removeEventListener('mousemove', mousemove)
      card.removeEventListener('mouseleave', mouseleave)
    }
  }, [ref.current])

  return (
    <div className="animation__Glassmorphic-Card-with-Glow-Cursor">
      <div className="card-container">
        <div ref={ref} className="card">
          <h2 style={{ fontSize: 15 }}>Web Design</h2>
          <p style={{ fontSize: 14 }}>
            Interactive, modern and responsive websites.
          </p>
          <div className="glow"></div>
        </div>
      </div>
    </div>
  )
}
