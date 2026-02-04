import React from 'react'

export default function DigitalRain() {
  console.log('start render ....')
  React.useEffect(() => {
    const canvas: any = document.getElementById('matrix')
    const ctx = canvas.getContext('2d')
    // canvas.width = window.innerWidth
    // canvas.height = window.innerHeight
    canvas.width = 800
    canvas.height = 400
    const chars = '01'
    const drops = Array(Math.floor(canvas.width / 20)).fill(0)

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#0F0'
      drops.forEach((drop, i) => {
        ctx.fillText(chars[Math.random() > 0.5 ? 0 : 1], i * 20, drop)
        drops[i] = drop > canvas.height ? 0 : drop + 20
      })
    }
    const timer = setInterval(draw, 100)
    return () => {
      timer && clearInterval(timer)
    }
  }, [])
  return (
    <div className="animation__digital-rain">
      <canvas id="matrix"></canvas>
    </div>
  )
}
