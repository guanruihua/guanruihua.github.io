import React from 'react'

export const usePageState = () => {
  const init = () => {
    const canvas = document.getElementById('fw')
    const ctx = canvas.getContext('2d')

    let w, h

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    /* ===== FIREWORKS ===== */
    class Particle {
      constructor(x, y, color) {
        this.x = x
        this.y = y
        this.speed = Math.random() * 4 + 1
        this.angle = Math.random() * Math.PI * 2
        this.alpha = 1
        this.decay = Math.random() * 0.02 + 0.01
        this.color = color
      }
      update() {
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed + 0.3
        this.alpha -= this.decay
      }
      draw() {
        ctx.globalAlpha = this.alpha
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles = []

    function launchFirework() {
      const x = Math.random() * w
      const y = Math.random() * h * 0.5
      const color = `hsl(${Math.random() * 360}, 100%, 60%)`

      for (let i = 0; i < 120; i++) {
        particles.push(new Particle(x, y, color))
      }
    }

    setInterval(launchFirework, 150)

    /* Animation Loop */
    function animate() {
      ctx.clearRect(0, 0, w, h)

      particles.forEach((p, i) => {
        p.update()
        p.draw()
        if (p.alpha <= 0) particles.splice(i, 1)
      })

      requestAnimationFrame(animate)
    }
    animate()

    /* ===== TIMED SEQUENCE ===== */

    setTimeout(() => {
      const year = document.getElementById('year')
      year.classList.remove('hidden')
      setTimeout(() => year.classList.add('show'), 30)
    }, 3000)

    setTimeout(() => {
      const wish = document.getElementById('wish')
      wish.classList.remove('hidden')
      setTimeout(() => wish.classList.add('show'), 30)
    }, 5000)

    /* ===== PUDGY SHOWS UP ===== */

    setTimeout(() => {
      const flash = document.getElementById('flash')
      const pudgy = document.getElementById('pudgy')
      const year = document.getElementById('year')
      const wish = document.getElementById('wish')

      // white flash
      flash.classList.remove('hidden')
      flash.classList.add('show')

      setTimeout(() => {
        flash.classList.add('hide')
        pudgy.classList.remove('hidden')
        pudgy.style.opacity = 1

        // MOVE text upward
        year.classList.add('shift-up')
        wish.classList.add('shift-up')
      }, 150)

      setTimeout(() => flash.classList.add('hidden'), 400)
    }, 7000)
  }

  React.useEffect(init, [])
}
